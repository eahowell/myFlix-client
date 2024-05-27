import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://myflix-eahowell-7d843bf0554c.herokuapp.com/movies/")
    .then((response) => response.json())
    .then((data) => {
      const moviesFromAPI = data.docs.map((doc) =>{
        return {
          _id: doc._id,
          Title: doc.Title,
          Director: {
              Name: doc. Director.Name,
              Birthday: doc. Director.Birthday,
              Deathday: doc. Director.Deathday,
              Bio: doc. Director.Bio 
            },
          Genre: {
            Name: doc.Genre.Name,
            Description: doc.Genre.Description 
          },
          Actors: doc.Actors,
          Description: doc.Description,
          ImagePath: doc.ImagePath
        }
      });
      setMovies(moviesFromAPI);
    });
  }, []);


  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty.</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
