import { useState, useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Login from './components/Login/Login';
import User from './components/User/User';
import { AuthContext } from './store/authContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


export default function App() {
  const authCtx = useContext(AuthContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    setIsLoggedIn(false)
  }

  const loginHandler = () => {
    setIsLoggedIn(true)
  }

  return (
    <Router>
      <div>
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
                {isLoggedIn ? <p>Welcome Sam</p> : <p>Please log in</p>}
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Switch>
          <Route path="/user">
            {!isLoggedIn ? <Redirect to="/" /> : <User onLogout={logoutHandler} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}
          </Route>
          <Route path="/">
            {isLoggedIn ? <Redirect to="/user" /> : <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} onLogIn={loginHandler} />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
