import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice.js";
import { Form } from "react-bootstrap";
import AuthCard from "../AuthCard/AuthCard";
import classes from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailWasTouched, setEmailWasTouched] = useState(false);
  const [passwordWasTouched, setPasswordWasTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const dispatch = useDispatch();
  const loginErrorMessage = useSelector((state) => state.auth.errorMessage);

  const emailValidationRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  const emailIsValid = emailValidationRegex.test(email);
  const emailInputIsInvalid = !emailIsValid && emailWasTouched;
  const passwordIsValid = password.length > 5;
  const passwordInputIsInvalid = !passwordIsValid && passwordWasTouched;
  const emailInputClasses = emailInputIsInvalid ? classes.invalid : " ";
  const passwordInputClasses = passwordInputIsInvalid ? classes.invalid : " ";

  const loginHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return; //Do not submit form if email or password are invalid
    }

    const userInfo = {
      email,
      password,
    };

    dispatch(loginUser(userInfo));

    setEmailWasTouched(false);

    setFormSubmitted(true);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onEmailBlur = (e) => {
    setEmailWasTouched(true);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onPasswordBlur = (e) => {
    setPasswordWasTouched(true);
  };

  useEffect(() => {
    if (emailIsValid && passwordIsValid) {
      setFormIsValid(true);
    }
  }, [emailIsValid, passwordIsValid]);

  return (
    <>
      <AuthCard header="Login" mainScreen="register" submit={loginHandler}>
        <Form.Group className="mb-3" controlId="emailLogin">
          <Form.Control
            type="text"
            name="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Email"
            onBlur={onEmailBlur}
            className={emailInputClasses}
          />
          {emailInputIsInvalid && (
            <p className={classes.message}>
              Email must be a valid email address
            </p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordLogin">
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Password"
            onBlur={onPasswordBlur}
            className={passwordInputClasses}
          />
          {passwordInputIsInvalid && (
            <p className={classes.message}>
              Password must be at least 6 characters
            </p>
          )}
        </Form.Group>
        {loginErrorMessage && formSubmitted && (
          <p className={classes.message}>{loginErrorMessage}</p>
        )}
      </AuthCard>
    </>
  );
};

export default Login;
