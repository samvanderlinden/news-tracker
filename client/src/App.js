import { useState } from 'react';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import User from './components/User/User';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    setIsLoggedIn(false)
  }

  // return (
  //   <div>
  //     <Header />
  //     {isLoggedIn ? <User onLogout={logoutHandler} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
  //   </div>
  // );
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/user">
            <User onLogout={logoutHandler} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
