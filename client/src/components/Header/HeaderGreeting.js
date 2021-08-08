import { useContext } from 'react';
import { AuthContext } from '../../store/authContext';
import { Button } from 'react-bootstrap';

const HeaderGreeting = ({ isLoggedIn, onLogout }) => {
  const authContext = useContext(AuthContext)
  if (isLoggedIn) {
    return (
      <>
        {`Welcome ${authContext.email}`} <Button variant="secondary" size="sm" onClick={onLogout}>Logout</Button>
      </>
    )
  }
  return (
    <>
      <p>Please Login</p>
    </>
  )
}

export default HeaderGreeting;