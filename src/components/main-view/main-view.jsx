import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";

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

  if (!storedUser) {
    return (
      <>
        <div class="container">
          <div class="container-signlog">
            <div class="container-login">
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
              />
            </div>
            <div class="">
              <h1 class="text-center orDiv"> OR</h1>
            </div>
            <div class="container-signup">
              <SignupView />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (selectedMovie) {
    let similarMovies = Movies.filter(
      (Movie) =>
        Movie.Genre.Name === selectedMovie.Genre.Name &&
        Movies._id !== selectedMovie._id
    );
    return (
      <>
        <div id="nav-bar"></div>
        <MovieView
          Movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
          className="movie-view"
        />
        <hr />
        <br />
        <h2>Similar Movies in the {selectedMovie.Genre.Name} Genre</h2>
        <div className="movies-grid">
          {similarMovies.map((Movie) => (
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
      </>
    );
  }
  if (Movies.length === 0) {
    return <div>The list is empty.</div>;
  }
  return (
    <div>
      <div class="loggedInAs">
      Logged in as: {storedUser.Username}
      <br />
      <button
        id="logout-button"
        class="btn btn-dark"
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
      <br /><br />
      </div>
      <div className="movies-grid">
        {Movies.map((Movie) => (
          <MovieCard
            key={Movie._id}
            Movie={Movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    </div>
  );
};
