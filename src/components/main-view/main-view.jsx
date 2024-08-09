import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { UserProfile } from "../profile-view/profile-view.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import UserProfile from "../profile-view/profile-view.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";

export const MainView = () => {
  const Movies = useSelector((state) => state.movies);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);  
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    
    if (!token) {
      setIsLoading(false);
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
        });
        dispatch(setMovies(moviesFromAPI));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error", error);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
      />
      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Row className="justify-content-md-center">
            <Routes>
              <Route
                path="/signup"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={12} className="container-signup">
                        <SignupView />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={10} className="container-login">
                        <LoginView />
                      </Col>
                    )}
                  </>
                }
              />

              <Route
                path="/users"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : (
                      <Col>
                        <UserProfile
                        />
                      </Col>
                    )}
                  </>
                }
              />

              <Route
                path="/movies/:movieID"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : Movies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <>
                        <Col md={8}>
                          <MovieView
                          />
                        </Col>
                      </>
                    )}
                  </>
                }
              />
              <Route
                path="/"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : Movies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <>
                        <div className="movies-grid">
                          {Movies.map((Movie) => (
                            <Col key={Movie._id} md={3} className="mb-2">
                              <MovieCard
                                Movie={Movie}
                              />
                            </Col>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                }
              />
            </Routes>
          </Row>
        )}
      </div>
    </BrowserRouter>
  );
};
