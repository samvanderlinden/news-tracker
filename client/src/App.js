import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");

  const auth = useSelector((state) => state.auth.value);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setPassword("");
    setEmail("");
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

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
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        register: registerHandler,
      }}
    >
      <Router>
        <Navbar bg="dark" variant="dark">
          <Container>
            {auth && (
              <Nav className="me-auto">
                <LinkContainer to="/favorites">
                  <Nav.Link>Favorites</Nav.Link>
                </LinkContainer>
              </Nav>
            )}
            {auth && (
              <Nav className="me-auto">
                <LinkContainer to="/search">
                  <Nav.Link>Search</Nav.Link>
                </LinkContainer>
              </Nav>
            )}
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <HeaderGreeting isLoggedIn={auth} onLogout={logoutHandler} />
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Switch>
          <Route path="/search">
            {!auth ? (
              <Redirect to="/" />
            ) : (
              <User
                onLogout={logoutHandler}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={auth}
              />
            )}
          </Route>
          <Route path="/favorites">
            {!auth ? <Redirect to="/" /> : <Favorites />}
          </Route>
          <Route path="/register">
            {auth ? (
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
            {auth ? (
              <Redirect to="/search" />
            ) : (
              <Login
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                onLogIn={loginHandler}
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
