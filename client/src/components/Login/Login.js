import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/authSlice.js";
import { Form } from "react-bootstrap";
import AuthCard from "../AuthCard/AuthCard";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();

    const userInfo = {
      email,
      password,
    };

    dispatch(loginUser(userInfo));
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChnage = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <AuthCard header="Login" mainScreen="register" submit={loginHandler}>
        <Form.Group className="mb-3" controlId="usernameLogin">
          <Form.Control
            type="text"
            name="username"
            value={email}
            onChange={onEmailChange}
            placeholder="Email"
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
    </>
  );
};

export default Login;
