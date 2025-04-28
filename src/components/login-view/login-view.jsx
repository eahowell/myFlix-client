import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setToken } from "../../redux/reducers/token";
import { Navigate } from "react-router-dom";

export const LoginView = ({ onLoggedIn }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    // Prevent default reload entire page action
    event.preventDefault();
    setIsLoading(true);

    const data = {
      Username: Username,
      Password: Password,
    };

    fetch(
      "https://cc-myflix-alb-2050379200.us-east-1.elb.amazonaws.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Login failed.");
          setIsLoading(false);
        }
      })
      .then((data) => {
        console.log("Login Response: ", data);
        if (data.user) {
          dispatch(setUser(data.user));
          dispatch(setToken(data.token));
          console.log("User " + Username + " logged in successfully.");
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          setIsLoading(false);
          // <Navigate to="/" />;
        } else {
          setIsLoading(false);
          alert(
            "No user was found with that username and password. Please try again or register as a new"
          );
        }
      })
      .catch((e) => {
        setIsLoading(false);
        console.error("Error", e);
        alert("Login failed. Verify your username and password are correct.");
      });
  };
  return (
    <>
      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Form id="loginForm" onSubmit={handleSubmit}>
            <br />
            <Form.Group controlId="formUsername">
              <Form.Label id="usernameLabel">
                Username
                <Form.Control
                  type="text"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                  minLength={5}
                  required
                />
              </Form.Label>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label id="passwordLabel">
                Password
                <Form.Control
                  type="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Label>
            </Form.Group>
            <br />
            <Button id="submit-button" variant="warning" type="submit">
              Submit
            </Button>
            <br />
            <br />
          </Form>
        )}
      </div>
    </>
  );
};
