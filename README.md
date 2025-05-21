![myFlix Logo](src\img\myFlixLogo-Light.png)
# Welcome to the myFlix Client (React)

![GitHub issues](https://img.shields.io/github/issues/eahowell/myFlix-client?color=yellow)
![GitHub Repo stars](https://img.shields.io/github/stars/eahowell/myFlix-client)
![GitHub forks](https://img.shields.io/github/forks/eahowell/myFlix-client)
![GitHub watchers](https://img.shields.io/github/watchers/eahowell/myFlix-client)

## 📖 Overview

This is the client side of myFlix. myFlix is a full-stack (MERN: MongoDB, Express, React, Node.js) single-page web application that serves as a movie database. Users can browse a curated list of movies with detailed information including descriptions, directors, and genre details. Registered users can create a profile, manage their account, and add movies to their favorites and watch lists.

## 📎 Table of Contents

- [Welcome to the myFlix Client (React)](#welcome-to-the-myflix-client-react)
  - [📖 Overview](#-overview)
  - [📎 Table of Contents](#-table-of-contents)
  - [🚀 Features](#-features)
  - [📺 Demo](#-demo)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [🏎️ Getting Started](#️-getting-started)
    - [Prerequisites](#prerequisites)
    - [Main Flows](#main-flows)
  - [📦 Scripts](#-scripts)
  - [🔗 API Endpoints](#-api-endpoints)
  - [🪙 Authentication](#-authentication)
  - [🗄️ Database](#️-database)
  - [📂 Folder Structure](#-folder-structure)
  - [📐 Deployment](#-deployment)
  - [🤝 Contributing](#-contributing)
  - [✉️ Contact](#️-contact)
  - [](#)

## 🚀 Features

- User registration and authentication with JWT
- Browse and search a curated movie database
- View detailed movie information (descriptions, directors, genres, actors)
- Add movies to personal favorites list
- Create a "To Watch" list for future viewing
- User profile management (update personal information, change password)
- Responsive design for all devices
- Real-time search functionality
- Similar movie recommendations
  
[🔝](#welcome-to-the-myflix-client-react)

## 📺 Demo

- [Live myFlix Site](https://eahowell-myflix.netlify.app/)
- [Demo Video](https://www.loom.com/share/29a46cf2d8d64a64916970a9ffa01fd2?sid=ccd86a9f-8e26-4e9b-ab49-2ccfa9db7037)

Test account:
- Username: testportfolio
- Password: 12345678  
  
[🔝](#welcome-to-the-myflix-client-react)
## 🛠️ Tech Stack

- **Language & Framework:** React, Redux Toolkit, JavaScript (ES6+)  
- **Bundler:** Parcel  
- **UI:** React-Bootstrap, Bootstrap v5  
- **Routing:** React Router v6  
- **Authentication:** JWT (handled server-side; token stored in client)  
- **Dev Tools:** Postman, Prettier  
- **Hosting:** Netlify (client), Heroku (API) 

The application follows a client-server architecture with a RESTful API. The frontend and backend are completely decoupled, allowing for greater flexibility and scalability.
  
[🔝](#welcome-to-the-myflix-client-react)
## 🏎️ Getting Started

### Prerequisites

- Node.js (version 14.0.0 or higher)
- npm (version 6.0.0 or higher)
- Parcel CLI (globally, if you prefer):  
  ```bash
  npm install -g parcel    
[🔝](#welcome-to-the-myflix-client-react)
## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/eahowell/myFlix-client.git
   cd myFlix-client
2. Install dependencies:
    ```bash 
    npm install
3. Create a .env file in the root directory (if needed for local development):

4. Start the development server:
    ```bash 
    npm start
5. Open your browser and navigate to http://localhost:1234 (or the port specified in your terminal)
  
[🔝](#welcome-to-the-myflix-client-react)
## ⛓️ Dependencies

### Core Dependencies
- @reduxjs/toolkit: 1.8.5  
- bootstrap: ^5.3.3  
- prop-types: ^15.8.1  
- react: ^18.2.0  
- react-bootstrap: ^2.10.4  
- react-dom: ^18.2.0  
- react-redux: 8.0.2  
- react-router: ^6.25.1  
- react-router-dom: ^6.25.1  
- redux: ^4.2.1  

### Dev Dependencies
- @parcel/transformer-sass: ^2.12.0  
- parcel: ^2.12.0  
- process: ^0.11.10  
  
[🔝](#welcome-to-the-myflix-client-react)
## ⚙️ Usage

After installation, start the dev server:

```bash
npm start
```
Visit `http://localhost:1234` in your browser. Parcel’s default port.   
*Note:* Seeing movies and creating favorites require login, you can sign up and create a profile or you can use the test profile:
```bash
Username: testportfolio
Password: 12345678
```
### Main Flows
- **Home**: Browse all movies  
- **Sign Up**: Create an account  
- **Login**: Access profile  
- **Movie Details**: View full info  
- **Profile**: Manage favorites & to-watch list  
## 📦 Scripts

| Command         | Description                                  |
|-----------------|----------------------------------------------|
| `npm start`     | Starts Parcel dev server with HMR            |
| `npm run build` | Creates a production bundle in `dist/`       |

  
[🔝](#welcome-to-the-myflix-client-react)
## 🔗 API Endpoints
The client communicates with the [myFlix API](https://github.com/eahowell/movie_api) hosted on Heroku. Key endpoints include:
  - <summary><code>GET</code> <code><b>/movies</b></code> <code>Retrieve all movies</code></summary>
  - <summary><code>GET</code> <code><b>/movies/:movieId</b></code> <code>Get a specific movie by ID</code></summary>
  - <summary><code>GET</code> <code><b>/users/:Username</b></code> <code>Get user information</code></summary>
  - <summary><code>POST</code> <code><b>/users</b></code> <code>Register a new user</code></summary>
  - <summary><code>PUT</code> <code><b>/users/:Username</b></code> <code>Update user information</code></summary>
  - <summary><code>PUT</code> <code><b>/users/:Username/favorites/:MovieID</b></code> <code>Add a movie to favorites</code></summary>
  - <summary><code>DELETE</code> <code><b>/users/:Username/favorites/:MovieID</b></code> <code>Remove a movie from favorites</code></summary>
  - <summary><code>PUT</code> <code><b>/users/:Username/toWatch/:MovieID</b></code> <code>Add a movie to watch list</code></summary>
  - <summary><code>DELETE</code> <code><b>/users/:Username/toWatch/:MovieID</b></code> <code>Remove a movie from watch list</code></summary>

_For a complete list of endpoints and documentation, visit the [API Repository](https://github.com/eahowell/movie_api)._
  
[🔝](#welcome-to-the-myflix-client-react)
## 🪙 Authentication

JWTs are stored in `localStorage`.  
Send as header:  
`Authorization: Bearer <token>`
  
[🔝](#welcome-to-the-myflix-client-react)
## 🗄️ Database
- myFlixDB is stored in MongoDB

- Collections:
  - Users  
  - Movies  
  - Genres  
  - Directors  
  - Actors  
  
[🔝](#welcome-to-the-myflix-client-react)
## 📂 Folder Structure

```text
myFlix-client/
├── src/
│   ├── components/
│   ├── img/
│   ├── redux/
│   ├── index.html
│   ├── index.jsx
│   └── index.scss
├── .gitignore
├── netlify.toml
├── package.json
└── README.md
```
  
  
[🔝](#welcome-to-the-myflix-client-react)
## 📐 Deployment

**Client (Netlify)**
1. Connect your GitHub repo  
2. Build command: `npm run build`  
3. Publish directory: `dist`

**API (Heroku)**  
See backend repo for setup.
  
[🔝](#welcome-to-the-myflix-client-react)
## 🤝 Contributing
1. Fork the repo  
2. Create a feature branch: `git checkout -b feature/your-feature-name`  
3. Commit your changes: `git commit -m "Add some feature"`  
4. Push to branch: `git push origin feature/your-feature-name`  
5. Open a pull request  
  
[🔝](#welcome-to-the-myflix-client-react)
## ✉️ Contact

**Developer:** [Elizabeth Howell](ehowell.webdev@gmail.com)  
**Website:** [Portfolio](http://ehowell-dev.me/PortfolioWebsite/)  
**Twitter:** [ehowell_webdev](https://x.com/ehowell_webdev)  
**GitHub:** [eahowell](https://github.com/eahowell)
  
[🔝](#welcome-to-the-myflix-client-react)
##
Thank you for checking out myFlix! This application was developed as part of the Career Foundry Full-Stack Web Development Course to demonstrate skills in full-stack development, RESTful API design, authentication, and dynamic frontend rendering.
  
[🔝](#welcome-to-the-myflix-client-react)
