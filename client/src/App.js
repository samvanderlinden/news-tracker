import { useState } from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav, Container } from "react-bootstrap";
import Login from "./components/Login/Login";
import User from "./components/User/User";
import HeaderGreeting from "./components/Header/HeaderGreeting";
import { AuthContext } from "./store/authContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Favorites from "./components/User/Favorites";
import Register from "./components/Register/Register";
import "./index.css";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.value);

  const navTo = useNavigate();

  const registerHandler = (e) => {
    e.preventDefault();
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterUsername("");
  };
  return (
    <AuthContext.Provider
      value={{
        email: email,
        password: password,
        registerEmail: registerEmail,
        registerPassword: registerPassword,
        registerUsername: registerUsername,
        register: registerHandler,
      }}
    >
      <Navbar className="nav" variant="dark">
        <Container>
          {isLoggedIn && (
            <Nav className="me-auto">
              <Nav.Link onClick={() => navTo("/favorites")}>Favorites</Nav.Link>
            </Nav>
          )}
          {isLoggedIn && (
            <Nav className="me-auto">
              <Nav.Link onClick={() => navTo("/search")}>Search</Nav.Link>
            </Nav>
          )}
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <HeaderGreeting isLoggedIn={isLoggedIn} />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <h1>Learn React</h1>

      <Routes>
        <Route
          path="/search"
          element={!isLoggedIn ? <Navigate to="/" /> : <User />}
        />
        <Route
          path="/favorites"
          element={!isLoggedIn ? <Navigate to="/" /> : <Favorites />}
        />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/search" />
            ) : (
              <Register
                email={registerEmail}
                assword={registerPassword}
                setEmail={setRegisterEmail}
                setPassword={setRegisterPassword}
                username={registerUsername}
                setUsername={setRegisterUsername}
              />
            )
          }
        />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/search" />
            ) : (
              <Login
                isLoggedIn={isLoggedIn}
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
              />
            )
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
}
