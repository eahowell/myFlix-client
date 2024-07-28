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
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [passwordErrors, setPasswordErrors] = useState({
    new: "",
    confirm: ""
  });
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
    if (name === 'new') {
      setIsPasswordChanged(value !== "");
      setPasswordErrors(prev => ({ ...prev, new: "" }));
    } else if (name === 'confirm') {
      setPasswordErrors(prev => ({ ...prev, confirm: "" }));
    }
  };

  const refreshUserData = async () => {
    try {
      const response = await fetch(
        `https://myflix-eahowell-7d843bf0554c.herokuapp.com/users/${user.Username}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) throw new Error("Failed to fetch user data");
      const userData = await response.json();
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (err) {
      console.error("Failed to refresh user data", err);
      return null;
    }
  };

  const validatePasswords = async () => {
    if (!passwords.current) {
      setPasswordErrors(prev => ({ ...prev, confirm: "Please enter your current password" }));
      return false;
    }

    try {
      const response = await fetch("https://myflix-eahowell-7d843bf0554c.herokuapp.com/validation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username: user.Username, Password: passwords.current }),
      });

      if (!response.ok) {
        setPasswordErrors(prev => ({ ...prev, confirm: "Incorrect password" }));
        return false;
      }

      if (isPasswordChanged && passwords.new !== passwords.confirm) {
        setPasswordErrors(prev => ({ ...prev, new: "Passwords do not match" }));
        return false;
      }

      return true;
    } catch (e) {
      console.error("Failed to validate password", e);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!(await validatePasswords())) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://myflix-eahowell-7d843bf0554c.herokuapp.com/users/${user.Username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) throw new Error("Failed to update user data");

      const updatedUserData = await refreshUserData();
      if (updatedUserData) {
        setEditMode(false);
        setPasswords({ current: "", new: "", confirm: "" });
        setIsPasswordChanged(false);
        setPasswordErrors({ new: "", confirm: "" });
        alert("Profile updated successfully!");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    
    if (!(await validatePasswords())) {
      setIsLoading(false);
      return;
    }

    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const response = await fetch(
          `https://myflix-eahowell-7d843bf0554c.herokuapp.com/users/${user.Username}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to delete account");

        alert("Account deleted successfully");
        onLoggedOut();
        return <Navigate to="/login" />;
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const handleCancelChanges = () => {
    setUpdatedUser({});
    setEditMode(false);
    setPasswords({ current: "", new: "", confirm: "" });
    setPasswordErrors({ new: "", confirm: "" });
    setIsPasswordChanged(false);
  };

  const getValue = (key) => updatedUser[key] ?? user?.[key] ?? "";

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!user) return <Alert variant="warning">No user data found</Alert>;

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Container>
          <h1 className="my-4">User Profile</h1>
          <Form onSubmit={handleSubmit}>
            {editMode ? (
              <>
                <Button variant="primary" type="submit" className="me-2">Save Changes</Button>
                <Button variant="secondary" onClick={handleCancelChanges} className="me-2">Cancel Changes</Button>
                <Button variant="danger" onClick={handleDeleteAccount}>Delete Account</Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => setEditMode(true)} className="me-2">Edit Profile</Button>
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
                        name="current"
                        value={passwords.current}
                        onChange={handlePasswordChange}
                        required
                      />
                      <Form.Text>
                        You must enter your current password for any changes to your account, including deleting your account.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                {passwordErrors.confirm && (
                  <Alert variant="danger">{passwordErrors.confirm}</Alert>
                )}

                <Row className="justify-content-md-center">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="new"
                        value={passwords.new}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {isPasswordChanged && (
                  <Row className="justify-content-md-center">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirm"
                          value={passwords.confirm}
                          onChange={handlePasswordChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                )}

                {passwordErrors.new && (
                  <Alert variant="danger">{passwordErrors.new}</Alert>
                )}
              </>
            )}
        <Row className="justify-content-md-center">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control type="date" value={formatDate(user.Birthday)} readOnly />
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
                  {Movies.filter((movie) => user.ToWatch.includes(movie._id)).map((movie) => (
                    <MovieCard key={movie._id} Movie={movie} user={user} token={token} />
                  ))}
                </div>
              </Form.Group>
            </Row>
            
            <Row className="justify-content-md-center">
              <Form.Group className="mb-3">
                <Form.Label as="h1">Favorite Movies</Form.Label>
                <div className="movies-grid">
                  {Movies.filter((movie) => user.FavoriteMovies.includes(movie._id)).map((movie) => (
                    <MovieCard key={movie._id} Movie={movie} user={user} token={token} />
                  ))}
                </div>
              </Form.Group>
            </Row>
          </Form>
        </Container>
      )}
    </div>
  );
};

export default UserProfile;