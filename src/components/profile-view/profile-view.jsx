import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view.jsx";
import LoadingSpinner from "../loading-spinner/loading-spinner";

const UserProfile = ({ user, token, Movies, onLoggedOut }) => {
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);  
  const [isLoading, setIsLoading] = useState(false);

  function formatDate(dateString) {
    // Format date into YYYY-MM-DD
    // Parse the input date string
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // Return the formatted date string
    return `${year}-${month}-${day}`;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setIsPasswordChanged(e.target.value !== "");
    handleInputChange(e);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError("");
  };

  const validatePasswords = () => {
    if (currentPassword === "") {
      setConfirmPasswordError(
        "Please enter your current password to save edits to your account"
      );
      return false;
    }

    const passwordCheckData = {
      Username: user.Username,
      Password: currentPassword,
    };

    try {
      const response = await fetch("https://myflix-eahowell-7d843bf0554c.herokuapp.com/validation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordCheckData),
      });

      if (!response.ok) {
        console.log("Password validation failed.");
        setConfirmPasswordError(
          "The password you entered is incorrect. Please try again."
        );
        return false;
      }

      if (isPasswordChanged && newPassword !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return false;
      }

      return true;
    } catch (e) {
      alert("Error in validatePasswords(). Please try again.");
      console.error("Failed to validate password", e);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isValid = await validatePasswords();
    if (!isValid) {
      console.log("validatePasswords() returned as " + isValid +" in handleSubmit()");
      setIsLoading(false);
      alert("Validation failed.");
      return;
    }
    try {      
      console.log(updatedUser);      
      const response = await fetch(
        "https://myflix-eahowell-7d843bf0554c.herokuapp.com/users/" +
          user.Username,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );
      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Failed to update user data");
      } else {
        console.log(response);
        // refreshUserData();
        setIsLoading(false);
      }
      setIsLoading(false);
      setEditMode(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsPasswordChanged(false);
      setConfirmPasswordError("");
      alert("Profile updated successfully!");
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  const handleDeleteAccount = async (e) => {
    setIsLoading(true);
    const isValid = await validatePasswords();
    if (!isValid) {
      console.log("validatePasswords() returned as " + isValid +" in handleSubmit()");
      setIsLoading(false);
      alert("Validation failed.");
      return;
    } else {
      if (
        window.confirm(
          "Are you sure you want to delete your account? This action cannot be undone."
        )
      ) {
        try {
          const response = await fetch(
            "https://myflix-eahowell-7d843bf0554c.herokuapp.com/users/" +
              user.Username,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            console.log(response);
            setIsLoading(false);
            throw new Error("Failed to delete account");
          } else {

          setEditMode(false);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setPasswordError("");
          setConfirmPasswordError("");
          setIsPasswordChanged(false);
          setIsLoading(false);
          alert("Account deleted successfully");
          onLoggedOut();
          <Navigate to="/login" />;
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />;
        }} catch (err) {
          setError(err.message);
        }
      }
    }
  };

  const handleCancelChanges = () => {
    setUpdatedUser(user);
    setEditMode(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setConfirmPasswordError("");
    setIsPasswordChanged(false);
    setIsLoading(false);
  };

  // This function checks if the value in updatedUser is undefined. If it is, it falls back to the value in the original user object. If that's also undefined (or user is null), it returns an empty string.
  const getValue = (key) =>
    updatedUser[key] !== undefined ? updatedUser[key] : user ? user[key] : "";

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      // Entering edit mode
      setNewPassword("");
      setConfirmPassword("");
      setIsPasswordChanged(false);
    }
  };

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!user) return <Alert variant="warning">No user data found</Alert>;

  return (
    <>
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
    <Container>
      <h1 className="my-4">User Profile</h1>
      <Form onSubmit={handleSubmit}>
        {editMode ? (
          <>
            <Button variant="primary" type="submit" className="me-2">
              Save Changes
            </Button>
            <Button
              variant="secondary"
              onClick={handleCancelChanges}
              className="me-2"
            >
              Cancel Changes
            </Button>
            <Button variant="danger" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={toggleEditMode} className="me-2">
            Edit Profile
          </Button>
        )}
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="Username"
                value={getValue("Username")}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={editMode ? getValue("Email") : user.Email}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </Form.Group>
          </Col>
        </Row>

        {editMode && (
          <>
            <Row className="justify-content-md-center">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <Form.Text>
                    You must enter your password for any changes to your
                    account, including deleting your account.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            {confirmpasswordError && (
              <Alert variant="danger">{confirmpasswordError}</Alert>
            )}
          </>
        )}
        <Row className="justify-content-md-center">
          {editMode && (
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="Password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  placeholder="Enter new password"
                  disabled={!editMode}
                />
              </Form.Group>
            </Col>
          )}
        </Row>
        <Row className="justify-content-md-center">
          {editMode && isPasswordChanged && (
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </Form.Group>
            </Col>
          )}
        </Row>
        {passwordError && <Alert variant="danger">{passwordError}</Alert>}
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={formatDate(user.Birthday)}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="FirstName"
                value={editMode ? getValue("FirstName") : user.FirstName}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3 justify-content-md-center">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="LastName"
                value={editMode ? getValue("LastName") : user.LastName}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Form.Group className="mb-3">
            <Form.Label as="h1">To Watch List</Form.Label>
            <div className="movies-grid">
              {Movies.filter((Movie) => user.ToWatch.includes(Movie._id)).map(
                (Movie) => (
                  <MovieCard
                    key={Movie._id}
                    Movie={Movie}
                    user={user}
                    token={token}
                  />
                )
              )}
            </div>
          </Form.Group>
        </Row>
        <Row className="justify-content-md-center">
          <Form.Group className="mb-3">
            <Form.Label as="h1">Favorite Movies</Form.Label>
            <div className="movies-grid">
              {Movies.filter((Movie) =>
                user.FavoriteMovies.includes(Movie._id)
              ).map((Movie) => (
                <MovieCard
                  key={Movie._id}
                  Movie={Movie}
                  user={user}
                  token={token}
                />
              ))}
            </div>
          </Form.Group>
        </Row>
      </Form>
    </Container>
    )}
    </div>
  </>
  );
};

export default UserProfile;
