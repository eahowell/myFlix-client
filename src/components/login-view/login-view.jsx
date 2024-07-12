import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  // Prevent default reload entire page action
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password,
    };

    fetch("https://myflix-eahowell-7d843bf0554c.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Login failed.");
        }
      })
      .then((data) => {
        console.log("Login Response: ", data);
        if (data.user) {
          console.log("User " + Username + "logged in successfully.");
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert(
            "No user was found with that username and password. Please try again or register as a new"
          );
        }
      })
      .catch((e) => {
        alert("Login failed. Verify your username and password are correct.");
      });
  };
  return (
    <Form id="loginForm" 
    onSubmit={handleSubmit}>
      <h2 className="formTitle">Login</h2>
      <br />
      <Form.Group controlId="formUsername">
        <Form.Label id="usernameLabel">
          Username
          <Form.Control
            id="usernameInput"
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
            id="passwoordInput"
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Label>
      </Form.Group>
      <br />
      <Button id="submit-button" className="btn btn-dark" type="submit">
        Submit
      </Button>
      <br />
      <br />
    </Form>
  );
};
