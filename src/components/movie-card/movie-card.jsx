import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ Movie }) => {
  return (
    <Card
      style={{ width: "16rem", cursor: "pointer" }}
      className="card h-100"
      bg="dark"
      text="light"
    >
      <Card.Img
        variant="top"
        src={Movie.ImagePath}
        className="imgCard"
        style={{
          width: "14.5rem",
          height: "auto",
          margin: "5%",
          maxHeight: "300px",
        }}
      />
      <Card.Body className="align-content-end">
        <Card.Title>{Movie.Title}</Card.Title>
        <Card.Text>{Movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(Movie._id)}`}>
          <Button variant="warning">More Details</Button>
        </Link>
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
};
