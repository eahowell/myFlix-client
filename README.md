# myFlix Client Side - AWS
![GitHub issues](https://img.shields.io/github/issues/eahowell/myFlix-client?color=yellow)
![GitHub Repo stars](https://img.shields.io/github/stars/eahowell/myFlix-client)
![GitHub forks](https://img.shields.io/github/forks/eahowell/myFlix-client)
![GitHub watchers](https://img.shields.io/github/watchers/eahowell/myFlix-client)

 Client side of the myFlix app that's using the movie_api


## Table of Contents
- [myFlix Client Side - AWS](#myflix-client-side---aws)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
      - [Dependencies](#dependencies)
      - [Dev Depenencies](#dev-depenencies)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Database](#database)
  - [License](#license)

## Getting Started
- [Live myFlix Site](https://eahowell-myflix.netlify.app/)


## Installation
- Install Node
  - Get the newest release to download to your device. 
    - In the README section of this [NVM for Windows GitHub page](https://github.com/coreybutler/nvm-windows#readme), you’ll find a Download Now! button. 
    - Clicking this button will open information about the latest release, including a list of “Assets”. 
    - From this list, download the nvm-setup.zip file
- Install Parcel gobally
  - <code>npm install -g parcel</code>

#### Dependencies
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

#### Dev Depenencies
- @parcel/transformer-sass: ^2.12.0
- parcel: ^2.12.0
- process: ^0.11.10

## Usage
- Test your project using Parcel: 
  - parcel [Path to index.html]. 
    ** Make sure to use the actual path to “index.html” instead of [Path to index.html] (relative to the current directory you’re inside).

## API Endpoints
- API is housed on Heroku
- [Find the API and it's endpoint documentation here](https://github.com/eahowell/movie_api/blob/main/README.md)

## Authentication
- Uses LocalStrategy and JWTStrategy
- Users are authenticated with basic HTTP authentication and generating a JWT token for authenticating future requests

## Database
- myFlixDB is stored in MongoDB
- Collections include:
  - Users
  - Movies
  - Genres
  - Directors
  - Actors
  
## License
- ISC
