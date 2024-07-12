import PropTypes from "prop-types";
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ Movie, onMovieClick }) => {
  return (    
    <Card style = {{width: '15rem', cursor: "pointer"}} onClick={() => onMovieClick(Movie)} className="card h-100">
      <Card.Img variant="top" src={Movie.ImagePath} className="imgCard" style = {{width: '13.5rem'}}/>
      <Card.Body>
        <Card.Title className="cardTitle">{Movie.Title}</Card.Title>
        <Card.Text>{Movie.Director.Name}</Card.Text>
        <Button onClick={() => onMovieClick(Movie)} variant="primary">
          More Details
        </Button>
      </Card.Body>
    </Card>
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
