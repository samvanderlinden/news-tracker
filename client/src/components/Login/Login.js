import { useState, useContext, useReducer } from "react";
import { AuthContext } from "../../store/authContext";
import { Form, Col } from "react-bootstrap";
import AuthCard from "../AuthCard/AuthCard";

const Login = ({ setEmail, setPassword, email, password }) => {
  const authContext = useContext(AuthContext);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChnage = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <AuthCard header="Login" mainScreen="register" submit={authContext.login}>
        <Form.Group className="mb-3" controlId="usernameLogin">
          <Col sm="10">
            <Form.Control
              type="text"
              name="username"
              value={email}
              onChange={onEmailChange}
              placeholder="Username"
            />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordLogin">
          <Col sm="10">
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={onPasswordChnage}
              placeholder="Password"
            />
          </Col>
        </Form.Group>
      </AuthCard>
    </>
  );
};

export default Login;
