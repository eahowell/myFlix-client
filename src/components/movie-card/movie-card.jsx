import PropTypes from "prop-types";

export const MovieCard = ({ Movie, onMovieClick }) => {
  return (
    <div
      className="movie-card"
      onClick={() => {
        onMovieClick(Movie);
      }}
    >
      {Movie.Title}
    </div>
  );
};

//Set PropTypes for component

MovieCard.propTypes = {
  Movie: PropTypes.shape({
    Genre: PropTypes.shape({
      Description: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Bio: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
    }),
    _id: PropTypes.string.isRequired,
    Actors: PropTypes.array,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
