import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { resetArticles } from "../../store/articlesSlice";
import { Button } from "react-bootstrap";

const HeaderGreeting = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(resetArticles());

    dispatch(logout());
  };

  if (isLoggedIn) {
    return (
      <>
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
