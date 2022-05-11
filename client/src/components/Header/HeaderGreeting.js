import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { AuthContext } from "../../store/authContext";
import { Button } from "react-bootstrap";

const HeaderGreeting = () => {
  const authContext = useContext(AuthContext);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  if (isLoggedIn) {
    return (
      <>
        {`Welcome ${authContext.email}`}{" "}
        <Button variant="outline-light" size="sm" onClick={logoutHandler}>
          Logout
        </Button>
      </>
    );
  }
  return (
    <>
      <p>Login or Register</p>
    </>
  );
};

export default HeaderGreeting;
