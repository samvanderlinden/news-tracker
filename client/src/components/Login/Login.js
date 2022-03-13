import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice.js";
import { Form } from "react-bootstrap";
import AuthCard from "../AuthCard/AuthCard";
import TypewriterContent from "../TypewriterContent/TypewriterContent.js";
import classes from "./Login.module.css";

const Login = ({ setEmail, setPassword, email, password }) => {
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login());
    console.log("dispatch login");
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChnage = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={classes.container}>
      <TypewriterContent />
      <AuthCard header="Login" mainScreen="register" submit={loginHandler}>
        <Form.Group className="mb-3" controlId="usernameLogin">
          <Form.Control
            type="text"
            name="username"
            value={email}
            onChange={onEmailChange}
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordLogin">
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={onPasswordChnage}
            placeholder="Password"
          />
        </Form.Group>
      </AuthCard>
    </div>
  );
};

export default Login;
