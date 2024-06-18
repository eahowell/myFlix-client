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
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user.");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };
  return (
    <form id="loginForm" onSubmit={handleSubmit}>
      <label id="usernameLabel">
        Username  | 
        <input
          id="usernameInput"
          type="text"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={5}
          required
        />
      </label>
      <br />
      <br />
      <label id="passwoordLabel">
        Password  |  
        <input
          id="passwoordInput"
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <button id="submit-button"
      type="submit">Submit</button>
    </form>
  );
};
