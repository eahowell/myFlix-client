import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import onFavoriteImage from "../../img/onFavorite.png";
import offFavoriteImage from "../../img/offFavorite.png";
import onWatchImage from "../../img/onWatch.png";
import offWatchImage from "../../img/offWatch.png";

export const MovieCard = ({ Movie, user, token, onUserDataChange }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isToWatch, setIsToWatch] = useState(false);

   useEffect(() => {
    // Check if the movie is in the user's favorites or to-watch list
    setIsFavorite(user.FavoriteMovies.includes(Movie._id));
    setIsToWatch(user.ToWatch.includes(Movie._id));
  }, [user, Movie._id]);

    const handleFavoriteToggle = async () => {
    const methodType = isFavorite ? "DELETE" : "PUT";
    const endpoint = `https://myflix-eahowell-7d843bf0554c.herokuapp.com/users/${user.Username}/favorites/${Movie._id}`;
    try {
      const response = await fetch(endpoint, {
        method: methodType,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setIsFavorite(!isFavorite);
        onUserDataChange(updatedUser);
      } else {
        console.error("Server responded with an error:", await response.text());
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleToWatchToggle = async () => {
    try {
      const response = await fetch(
        `https://myflix-eahowell-7d843bf0554c.herokuapp.com/users/${user.Username}/toWatch/${Movie._id}`,
        {
          method: isToWatch ? "DELETE" : "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const updatedUser = await response.json();
        setIsToWatch(!isToWatch);
        onUserDataChange(updatedUser);
      } else {
        console.error("Server responded with an error:", await response.text());
      }
    } catch (error) {
      console.error("Error toggling to-watch:", error);
    }
  };

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
        <div className="d-flex justify-content-between mb-2">
          <Image
            src={isFavorite ? onFavoriteImage : offFavoriteImage}
            alt="Favorite Toggle"
            title={
              isFavorite
                ? "Click to Remove from Favorites List"
                : "Click to Add from Favorites List"
            }
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
            onClick={handleFavoriteToggle}
          />

          <Image
            src={isToWatch ? onWatchImage : offWatchImage}
            alt="To Watch Toggle"
            title={
              isToWatch
                ? "Click to Remove from Watch List"
                : "Click to Add from Watch List"
            }
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
            onClick={handleToWatchToggle}
          />

          <Link to={`/movies/${encodeURIComponent(Movie._id)}`}>
            <Button variant="warning">More Details</Button>
          </Link>
        </div>
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
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
    ToWatch: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
