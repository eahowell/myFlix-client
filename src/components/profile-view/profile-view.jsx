import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";

const UserProfile = () => {
  const [error, setError] = useState(null);
  const Movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({
    new: "",
    confirm: "",
  });
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error(`Invalid date: ${dateString}`);
      return "Invalid Date";
    }
    // If valid, format the date
    return date.toISOString().split("T")[0];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value !== user[name]) {
      setUpdatedUser((prev) => ({ ...prev, [name]: value }));
    } else {
      setUpdatedUser((prev) => {
        const newState = { ...prev };
        delete newState[name];
        return newState;
      });
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    if (name === "new") {
      setIsPasswordChanged(value !== "");
      setPasswordErrors((prev) => ({ ...prev, new: "" }));
    } else if (name === "confirm") {
      setPasswordErrors((prev) => ({ ...prev, confirm: "" }));
    }
  };

  const validatePasswords = async () => {
    if (!passwords.current) {
      setPasswordErrors((prev) => ({
        ...prev,
        confirm: "Please enter your current password",
      }));
      return false;
    }

    try {
      const response = await fetch(
        "cc-myflix-alb-2050379200.us-east-1.elb.amazonaws.com/validation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Username: user.Username,
            Password: passwords.current,
          }),
        }
      );
      if (!response.ok) {
        setPasswordErrors((prev) => ({
          ...prev,
          confirm: "Incorrect password",
        }));
        return false;
      } else {
        response.json();
      }

      if (isPasswordChanged && passwords.new !== passwords.confirm) {
        setPasswordErrors((prev) => ({
          ...prev,
          new: "Passwords do not match",
        }));
        return false;
      } else {
        return true;
      }
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
      let dataToUpdate = {};

      // Only include fields that have actually changed
      for (const [key, value] of Object.entries(updatedUser)) {
        if (value !== user[key]) {
          dataToUpdate[key] = value;
        }
      }

      // Add password if it's changed
      if (isPasswordChanged) {
        dataToUpdate.Password = passwords.new;
      }

      if (Object.keys(dataToUpdate).length === 0) {
        setError("No changes detected");
        setIsLoading(false);
        return;
      }

      console.log("Data being sent to server:", dataToUpdate); // For debugging
      const response = await fetch(
        `cc-myflix-alb-2050379200.us-east-1.elb.amazonaws.com/users/${user.Username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToUpdate),
        }
      );

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to update user. " + (await response.text()));
      }
      const updatedUserData = await response.json();
      if (updatedUserData) {
        dispatch(setUser(updatedUserData));
        setEditMode(false);
        setPasswords({ current: "", new: "", confirm: "" });
        setIsPasswordChanged(false);
        setPasswordErrors({ current: "", new: "", confirm: "" });
        setUpdatedUser({});
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

    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch(
          `cc-myflix-alb-2050379200.us-east-1.elb.amazonaws.com/users/${user.Username}`,
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
        localStorage.clear();
        dispatch(setUser(null));
        dispatch(setToken(null));
        navigate("/login");
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
              <Button
                variant="primary"
                onClick={() => setEditMode(true)}
                className="me-2"
              >
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
                    value={user.Username}
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
                    value={editMode ? updatedUser.Email : user.Email}
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
                        You must enter your current password for any changes to
                        your account, including deleting your account.
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
                    value={editMode ? updatedUser.FirstName : user.FirstName}
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
                    value={editMode ? updatedUser.LastName : user.LastName}
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
                  {Movies.filter((movie) =>
                    user.ToWatch.includes(movie._id)
                  ).map((movie) => (
                    <MovieCard key={movie._id} Movie={movie} />
                  ))}
                </div>
              </Form.Group>
            </Row>

            <Row className="justify-content-md-center">
              <Form.Group className="mb-3">
                <Form.Label as="h1">Favorite Movies</Form.Label>
                <div className="movies-grid">
                  {Movies.filter((movie) =>
                    user.FavoriteMovies.includes(movie._id)
                  ).map((movie) => (
                    <MovieCard key={movie._id} Movie={movie} />
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
