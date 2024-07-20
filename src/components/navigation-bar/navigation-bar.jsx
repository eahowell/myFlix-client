import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import BrandImage from "../../img/myFlixLogo-Light.png";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary navbar-full-width"
      bg="dark"
      data-bs-theme="dark"
      fixed="top"
      sticky="top"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={BrandImage}
            width="90"
            height="90"
            alt="Logo of myFlix that navigates to the home page"
            title="myFlix Application"
            class="page-header__item img-fluid mx-auto d-block"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="me-auto justify-content-end"
            style={{ paddingLeft: "15px", paddingTop: "10px" }}
          >
            {user && (
              <>
                <Navbar.Text className="justify-content-end">
                  Welcome back,
                  <strong>{user.Username}</strong>!
                </Navbar.Text>
                <Nav.Link
                  onClick={onLoggedOut}
                  style={{
                    fontSize: "smaller",
                    fontStyle: "italic",
                    paddingTop: "10px",
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            )}{" "}
          </Nav>
          <Nav
            className="mb-auto"
            style={{
              paddingLeft: "15px",
              paddingTop: "10px",
              paddingRight: "15px",
            }}
          >
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>

                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                <Nav.Link
                  as={Link}
                  to="https://myflix-eahowell-7d843bf0554c.herokuapp.com/documentation.html"
                  target="_blank"
                >
                  API Documentation
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
