import { useState } from 'react';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import User from './components/User/User';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    setIsLoggedIn(false)
  }

  return (
    <div>
      <Header />
      {isLoggedIn ? <User onLogout={logoutHandler} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}

export default App;
