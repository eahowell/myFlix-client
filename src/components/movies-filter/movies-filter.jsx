import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { setFilter } from "../../redux/reducers/movies";
export const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();
  return (
    <>
    <br />
      <Form.Control
        type="text"
        size="lg"
        className="mb-4 justify-content-center"
        style={{ paddingLeft: "15px", margin: "10px", maxWidth: "900px" }}
        placeholder="Search Movie Title..."
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
      <br />
    </>
  );
};
