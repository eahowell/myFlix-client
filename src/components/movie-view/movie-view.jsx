import PropTypes from "prop-types";

export const MovieView = ({ Movie, onBackClick }) => {
  return (
    <div>
      <div>
        <h1>Title: {Movie.Title}</h1>
      </div>
      <div className="movie-view-text">
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
      </div>
      <br />
      <button id = "back-button"
      onClick={onBackClick}>Back</button>
      <br />
      <br />
      <div>
        <img src={Movie.ImagePath} />
      </div>
      <br />
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
