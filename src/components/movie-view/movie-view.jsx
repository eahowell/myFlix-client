import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";

export const MovieView = ({ Movie, onBackClick }) => {
  return (
    <Card bg="light" border="warning">
      
      <Card.Body>
      <Button id="back-button" variant="warning" onClick={onBackClick}>
        Back
      </Button>
        <Card.Title as="h1">{Movie.Title}</Card.Title>
        <Card.Text className="movie-view-text text-start" style={{paddingLeft:'15px', margin:'10px', maxWidth:'900px'}}
        >
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
        </Card.Text>

        <br />
        {/* <Col md={8}> */}
        <div>
          <Card.Img src={Movie.ImagePath} style = {{width: '350px'}} />
        </div>
        {/* </Col> */}
        <br />
      </Card.Body>
    </Card>
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
