import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const SignupView = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Password !== event.target[2].value) {
      alert("Passwords do not match");
      return;
    }
    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
      FirstName: FirstName,
      LastName: LastName,
    };

    fetch("https://myflix-eahowell-7d843bf0554c.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Form id="registerForm" onSubmit={handleSubmit} >      
        <h2 className="formTitle">  Create your own account  </h2>
        <Form.Group controlId="Username">
          <Form.Label>
            Username
            <Form.Control
              type="text"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              id="usernameSignup"
              name="Username"
              pattern="^[a-zA-Z0-9]{5,15}$"
              required
              
            />
          </Form.Label>
          <div class="invalid-feedback">
            Username must be alphanumeric and between 5 and 15 characters long.
          </div>
        </Form.Group>
        <Form.Group controlId="Password" >
          <Form.Label >
            Password 
            <Form.Control
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              id="passwordSignup"
              name="Password"
              minLength="8"
              maxLength="25"
              required
            />
          </Form.Label>
          <div class="invalid-feedback">
            Password must be between 8 and 25 characters long.
          </div>
        </Form.Group>
        <Form.Group controlId="confirmPassword" >
          <Form.Label>
            Re-enter Password
            <Form.Control
              type="password"
              class="form-control"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
          </Form.Label>
          <div className="invalid-feedback">Passwords must match.</div>
        </Form.Group>
        <Form.Group controlId="Email" >
          <Form.Label >
            Email
            <Form.Control
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              id="emailSignup"
              name="Email"
              required
            />
          </Form.Label>
          <div className="invalid-feedback">
            Please enter a valid email address.
          </div>
        </Form.Group>
        <Form.Group controlId="Birthday" >
          <Form.Label >
            Birthday
            <Form.Control
              type="date"
              value={Birthday}
              onChange={(e) => setBirthday(e.target.value)}
              id="birthdaySignup"
              name="Birthday"
            />
          </Form.Label>
        </Form.Group>
        <Form.Group controlId="FirstName" >
          <Form.Label >
            First Name
            <Form.Control
              type="text"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-control"
              id="firstNameSignup"
              name="FirstName"
              required
            />
          </Form.Label>

          <div className="invalid-feedback">First name is required.</div>
        </Form.Group>
        <Form.Group controlId="LastName">
          <Form.Label>
            Last Name
            <Form.Control
              type="text"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-control"
              id="lastNameSignup"
              name="LastName"
              required
            />
          </Form.Label>
          <div className="invalid-feedback">Last name is required.</div>
        </Form.Group>
        <Button variant="warning" type="submit" >
          Register
        </Button>
    </Form>
  );
};
