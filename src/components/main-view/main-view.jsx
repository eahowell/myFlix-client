import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";

export const MainView = () => {
  const [Movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token){
      return;
    }
    fetch("https://myflix-eahowell-7d843bf0554c.herokuapp.com/movies/", {
      headers: {
        Authorization: `Bearer ${token}`,
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
        }, [token]);
        setMovies(moviesFromAPI);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here, e.g. display an error message
      });
  }, [token]);

  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
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
        <MovieView
          Movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <hr />
        <br />
        <h2>Similar Movies</h2>
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
      </>
    );
  }
  if (Movies.length === 0) {
    return <div>The list is empty.</div>;
  }
  return (
    <div>
    <button id="logout-button"
      onClick={() => {
        setUser(null);
        setToken(null);
      }}
    >
      Logout
    </button>
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
