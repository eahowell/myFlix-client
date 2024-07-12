import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [Movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!storedToken) {
      return;
    }
    fetch("https://myflix-eahowell-7d843bf0554c.herokuapp.com/movies/", {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Failed to fetch movies.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const moviesFromAPI = data.map((Movie) => {
          let directorDeathday = Movie.Director.Death_day
            ? { Deathday: Movie.Director.Death_day }
            : { Deathday: "" };
          let directorBirthday = Movie.Director.Birthday
            ? { Birthday: Movie.Director.Birthday }
            : { Deathday: "" };
          return {
            Genre: {
              Description: Movie.Genre.Description,
              Name: Movie.Genre.Name,
            },
            Director: {
              Bio: Movie.Director.Bio,
              Birthday: directorBirthday,
              Deathday: directorDeathday,
              Name: Movie.Director.Name,
            },
            _id: Movie._id,
            Actors: Movie.Actors,
            Title: Movie.Title,
            Description: Movie.Description,
            ImagePath: Movie.ImagePath,
            Title: Movie.Title,
          };
        });
        setMovies(moviesFromAPI);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [storedToken]);

  return (
    <Row className="justify-content-md-center">
      {!storedUser ? (
        <Col md={10}>          
            <div className="container-signlog">
              <div className="container-login">
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
              </div>
              <div className="">
                <h1 className="text-center orDiv"> OR</h1>
              </div>
              <div className="container-signup">
                <SignupView />
              </div>
            </div>
          </Col>
      ) : selectedMovie ? (
          <Col md={8}>
          <MovieView
            Movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
            className="movie-view"
          />
          <br />
          <h2>Similar Movies in the {selectedMovie.Genre.Name} Genre</h2>
          <div className="movies-grid">
            {Movies.filter(
              (Movie) =>
                Movie.Genre.Name === selectedMovie.Genre.Name &&
                Movies._id !== selectedMovie._id
            ).map((Movie) => (
              <MovieCard
                key={Movie._id}
                Movie={Movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            ))}
          </div>
          <br />
          <br />
          </Col>
      ) : Movies.length === 0 ? (
        <div>The list is empty.</div>
      ) : (
        <>
          <div>
            <div className="loggedInAs">
              Logged in as: {storedUser.Username}
              <br />
              <Button
                id="logout-button"
                className="btn btn-dark"
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              >
                Logout
              </Button>
              <br />
              <br />
            </div>
            <div className="movies-grid">
              {Movies.map((Movie) => (
                <Col key={Movie._id} md={3} className="mb-2">
                <MovieCard                  
                  Movie={Movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
                </Col>
              ))}
            </div>
          </div>
        </>
      )}
    </Row>
  );
};
