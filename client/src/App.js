import { useState } from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Login from "./components/Login/Login";
import User from "./components/User/User";
import HeaderGreeting from "./components/Header/HeaderGreeting";
import { AuthContext } from "./store/authContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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
      <Router>
        <Navbar className="nav" variant="dark">
          <Container>
            {isLoggedIn && (
              <Nav className="me-auto">
                <LinkContainer to="/favorites">
                  <Nav.Link>Favorites</Nav.Link>
                </LinkContainer>
              </Nav>
            )}
            {isLoggedIn && (
              <Nav className="me-auto">
                <LinkContainer to="/search">
                  <Nav.Link>Search</Nav.Link>
                </LinkContainer>
              </Nav>
            )}
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <HeaderGreeting isLoggedIn={isLoggedIn} />
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Switch>
          <Route path="/search">
            {!isLoggedIn ? <Redirect to="/" /> : <User />}
          </Route>
          <Route path="/favorites">
            {!isLoggedIn ? <Redirect to="/" /> : <Favorites />}
          </Route>
          <Route path="/register">
            {isLoggedIn ? (
              <Redirect to="/search" />
            ) : (
              <Register
                email={registerEmail}
                assword={registerPassword}
                setEmail={setRegisterEmail}
                setPassword={setRegisterPassword}
                username={registerUsername}
                setUsername={setRegisterUsername}
              />
            )}
          </Route>
          <Route path="/">
            {isLoggedIn ? (
              <Redirect to="/search" />
            ) : (
              <Login
                isLoggedIn={isLoggedIn}
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
              />
            )}
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
