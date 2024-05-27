import PropTypes from "prop-types";

export const MovieView = ({ Movie, onBackClick }) => {
  return (
    <div>
      <div>
        <span>Title: </span>
        <span>{Movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{Movie.Director.Name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{Movie.Genre.Name}</span>
      </div>
      <div>
        <span>Actors: </span>
        <span>{Movie.Actors.join(" , ")}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{Movie.Description}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
      <div>
        <img src={Movie.ImagePath} />
      </div>
    </div>
  );
};

//Set PropTypes for component
MovieView.propTypes = {
  Movie: PropTypes.shape({
    Genre: PropTypes.shape({
      Description: PropTypes.string,
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Bio: PropTypes.string,
      Name: PropTypes.string.isRequired,
    }),
    _id: PropTypes.string.isRequired,
    Actors: PropTypes.arrayOf(PropTypes.string),
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Title: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
