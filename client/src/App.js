import { useState, useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Login from './components/Login/Login';
import User from './components/User/User';
import HeaderGreeting from './components/Header/HeaderGreeting';
import { AuthContext } from './store/authContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logoutHandler = () => {
    setIsLoggedIn(false)
    setPassword('');
    setEmail('');
  }

  const loginHandler = () => {
    setIsLoggedIn(true)
  }

  return (
    <AuthContext.Provider value={{
      email: email,
      password: password,
      isLoggedIn: isLoggedIn
    }}>
      <Router>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/user">
                <Nav.Link>User</Nav.Link>
              </LinkContainer>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <HeaderGreeting isLoggedIn={isLoggedIn} onLogout={logoutHandler} />
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Switch>
          <Route path="/user">
            {!isLoggedIn ? <Redirect to="/" /> : <User onLogout={logoutHandler} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}
          </Route>
          <Route path="/">
            {isLoggedIn ? <Redirect to="/user" /> : <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} onLogIn={loginHandler} email={email} password={password} setEmail={setEmail} setPassword={setPassword} />}
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
