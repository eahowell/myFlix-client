import React from "react";
import { useState } from "react";

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
    <form id="loginForm" class="form-group" onSubmit={handleSubmit}>
      <div class="container mt-5">
        <h2 class="formTitle">Login</h2>
        <br />
        <label id="usernameLabel">
          Username
          <input
            id="usernameInput"
            type="text"
            value={Username}
            class="form-control"
            onChange={(e) => setUsername(e.target.value)}
            minLength={5}
            required
          />
        </label>
        <br />
        <br />
        <label id="passwoordLabel">
          Password
          <input
            id="passwoordInput"
            type="password"
            value={Password}
            class="form-control"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <button id="submit-button" class="btn btn-dark" type="submit">
          Submit
        </button>
      </div>
      <br />
      <br />
    </form>
  );
};
