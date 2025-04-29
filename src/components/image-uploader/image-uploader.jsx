import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Container,
} from "react-bootstrap";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import "./image-uploader.scss";

// Define the base URL for the image uploader API
// This should be configurable or stored in an environment variable
const IMAGE_API_BASE_URL = "http://ec2-3-239-161-207.compute-1.amazonaws.com/api/objects";

export const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Fetch already uploaded images on component mount
  useEffect(() => {
    fetchUploadedImages();
  }, []);

  const fetchUploadedImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(IMAGE_API_BASE_URL);
      const data = await response.json();

      if (data.success) {
        // Format uploaded images data
        const images = data.originals
          ? data.originals
              // Filter out folders and only include files that don't begin with "resized-images/"
              .filter(orig => {
                // Skip folders (they typically end with a slash)
                if (orig.Key.endsWith('/')) return false;
                
                // Skip items in the resized-images folder
                if (orig.Key.startsWith('resized-images/')) return false;
                
                // Include everything else
                return true;
              })
              .map((orig) => {
                const name = orig.Key.split("/").pop();
                const resizedKey = `resized-images/${name}`;
                const resizedObj = data.resized
                  ? data.resized.find((r) => r.Key === resizedKey)
                  : null;

                return {
                  name,
                  originalKey: orig.Key,
                  resizedKey,
                  originalSize: formatSize(orig.Size),
                  resizedSize: resizedObj ? formatSize(resizedObj.Size) : "-",
                  uploadDate: new Date(orig.LastModified).toLocaleString(),
                  thumbnailUrl: `${IMAGE_API_BASE_URL}/${encodeURIComponent(
                    resizedKey
                  )}`,
                  originalUrl: `${IMAGE_API_BASE_URL}/${encodeURIComponent(
                    orig.Key
                  )}`,
                };
              })
          : [];

        setUploadedImages(images);
      } else {
        setUploadStatus({
          type: "danger",
          message: "Failed to fetch uploaded images: " + data.message,
        });
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setUploadStatus({
        type: "danger",
        message: "Error fetching images: " + error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Format file size to be more readable
  const formatSize = (size) => {
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(2) + " KB";
    if (size < 1024 * 1024 * 1024)
      return (size / (1024 * 1024)).toFixed(2) + " MB";
    return (size / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Create a preview URL for the selected image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  // Handle file upload
  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setUploadStatus({
        type: "warning",
        message: "Please select a file first",
      });
      return;
    }

    setIsLoading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(IMAGE_API_BASE_URL, {
        method: "POST",
        body: formData,
        // No need to set Content-Type header for FormData
        // The browser will automatically set it with the appropriate boundary
        
        // You might need to set credentials if your API requires authentication
        // credentials: 'include', // or 'same-origin'
      });

      const data = await response.json();

      if (data.success) {
        setUploadStatus({
          type: "success",
          message: "Image uploaded successfully!",
        });
        setSelectedFile(null);
        setPreviewUrl(null);

        // Refresh the list of uploaded images
        fetchUploadedImages();
      } else {
        setUploadStatus({
          type: "danger",
          message: "Upload failed: " + data.message,
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus({
        type: "danger",
        message: "Error uploading file: " + error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to open image in new tab
  const openImage = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Container className="image-uploader-container">
      <h1 className="my-4 text-center">Image Uploader</h1>

      {isLoading && !uploadedImages.length ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Upload Form */}
          <Card className="mb-4 p-4 bg-light">
            <Card.Title as="h2">Upload New Image</Card.Title>
            <Form onSubmit={handleUpload}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Select an image to upload:</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Form.Group>

              {previewUrl && (
                <div className="image-preview mb-3">
                  <h5>Preview:</h5>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}

              <Button variant="warning" type="submit" disabled={!selectedFile || isLoading}>
                {isLoading && uploadStatus === null ? 'Uploading...' : 'Upload to S3'}
              </Button>
            </Form>

            {uploadStatus && (
              <Alert variant={uploadStatus.type} className="mt-3">
                {uploadStatus.message}
              </Alert>
            )}
          </Card>

          {/* Uploaded Images */}
          <Card className="mb-4 p-4">
            <Card.Title as="h2">Your Uploaded Images</Card.Title>
            <div className="mb-3">
              <Button 
                variant="warning" 
                onClick={fetchUploadedImages}
                disabled={isLoading}
              >
                {isLoading ? 'Refreshing...' : 'Refresh List'}
              </Button>
            </div>

            {uploadedImages.length === 0 ? (
              <p>No images uploaded yet.</p>
            ) : (
              <Row>
                {uploadedImages.map((image, index) => (
                  <Col md={4} className="mb-4" key={index}>
                    <Card className="h-100">
                      <Card.Img
                        variant="top"
                        src={image.thumbnailUrl}
                        className="img-fluid p-2"
                        style={{ height: "200px", objectFit: "contain" }}
                        alt={image.name}
                      />
                      <Card.Body>
                        <Card.Title>{image.name}</Card.Title>
                        <Card.Text>
                          <small>Original: {image.originalSize}</small>
                          <br />
                          <small>Resized: {image.resizedSize}</small>
                          <br />
                          <small>Uploaded: {image.uploadDate}</small>
                        </Card.Text>
                        <div className="d-flex justify-content-between">
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => openImage(image.originalUrl)}
                          >
                            View Original
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => openImage(image.thumbnailUrl)}
                          >
                            View Resized
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Card>
        </>
      )}
    </Container>
  );
};

export default ImageUploader;