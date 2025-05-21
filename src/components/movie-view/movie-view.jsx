import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { useSelector } from "react-redux";

export const MovieView = () => {
  const Movies = useSelector((state) => state.movies.list);
 
  const { movieID } = useParams();

  const Movie = Movies.find((m) => m._id === movieID);

  return (
    <div>
      <Card bg="light" border="warning">
        <Card.Body>
          <Link to={`/`}>
            <Button id="back-button" variant="warning">
              Back
            </Button>
          </Link>
          <Card.Title as="h1">{Movie.Title}</Card.Title>
          <Card.Text
            className="movie-view-text text-start"
            style={{ paddingLeft: "15px", margin: "10px", maxWidth: "900px" }}
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
          <div>
            <Card.Img src={Movie.ImagePath} style={{ width: "350px" }} />
          </div>
          <br />
        </Card.Body>
      </Card>
      <br />
      <h2>Similar Movies in the {Movie.Genre.Name} Genre</h2>
      <div className="movies-grid justify-content-md-center">
        {Movies.filter(
          (Movies) =>
            Movies.Genre.Name === Movie.Genre.Name 
        ).map((Movie) => (
          <MovieCard
            key={Movie._id}
            Movie={Movie}
          />
        ))}
      </div>
      <br />
      <br />
    </div>
  );
};
