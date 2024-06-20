import React from "react";
import { useState } from "react";

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
    <form id="registerForm" onSubmit={handleSubmit}>
      <div class="container mt-5">
        <h2 class="formTitle">Register</h2>
        <br />
        <div class="form-group">
          <label for="Username">
            Username
            <input
              type="text"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              class="form-control"
              id="usernameSignup"
              name="Username"
              pattern="^[a-zA-Z0-9]{5,15}$"
              required
            />
          </label>
          <div class="invalid-feedback">
            Username must be alphanumeric and between 5 and 15 characters long.
          </div>
        </div>
        <div class="form-group">
          <label for="Password">
            Password
            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              class="form-control"
              id="passwordSignup"
              name="Password"
              minLength="8"
              maxLength="25"
              required
            />
          </label>
          <div class="invalid-feedback">
            Password must be between 8 and 25 characters long.
          </div>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Re-enter Password
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            name="confirmPassword"
            required
          />
          </label>
          <div class="invalid-feedback">Passwords must match.</div>
        </div>
        <div class="form-group">
          <label for="Email">
            Email
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              class="form-control"
              id="emailSignup"
              name="Email"
              required
            />
          </label>
          <div class="invalid-feedback">
            Please enter a valid email address.
          </div>
        </div>
        <div class="form-group">
          <label for="Birthday">
            Birthday
            <input
              type="date"
              value={Birthday}
              onChange={(e) => setBirthday(e.target.value)}
              class="form-control"
              id="birthdaySignup"
              name="Birthday"
            />
          </label>
        </div>
        <div class="form-group">
          <label for="FirstName">
            First Name
            <input
              type="text"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              class="form-control"
              id="firstNameSignup"
              name="FirstName"
              required
            />
          </label>

          <div class="invalid-feedback">First name is required.</div>
        </div>
        <div class="form-group">
          <label for="LastName">
            Last Name
            <input
              type="text"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              class="form-control"
              id="lastNameSignup"
              name="LastName"
              required
            />
          </label>
          <div class="invalid-feedback">Last name is required.</div>
        </div>
        <br />
        <button type="submit" class="btn btn-dark">
          Register
        </button>
        <br />
      </div>
    </form>
  );
};
