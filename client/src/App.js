import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav, Container } from "react-bootstrap";
import Login from "./components/Login/Login";
import Search from "./components/User/Search";
import HeaderGreeting from "./components/Header/HeaderGreeting";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Favorites from "./components/User/Favorites";
import Register from "./components/Register/Register";
import classes from "./App.module.css";

export default function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.jwtToken);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("jwtToken");
    }
  });

  return (
    <>
      <Navbar className="nav" variant="dark">
        <Container>
          {isLoggedIn && (
            <Nav className="me-auto">
              <Link to="/favorites" className={classes.link}>
                Favorites
              </Link>
            </Nav>
          )}
          {isLoggedIn && (
            <Nav className="me-auto">
              <Link to="/search" className={classes.link}>
                Search
              </Link>
            </Nav>
          )}
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <HeaderGreeting isLoggedIn={isLoggedIn} />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className={classes["routes-container"]}>
        <Routes>
          <Route
            path="/search"
            element={!isLoggedIn ? <Navigate to="/" /> : <Search />}
          />
          <Route
            path="/favorites"
            element={!isLoggedIn ? <Navigate to="/" /> : <Favorites />}
          />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/search" /> : <Register />}
          />
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/search" /> : <Login />}
          />
        </Routes>
      </div>
    </>
  );
}
