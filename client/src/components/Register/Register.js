import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { registerUser } from "../../store/authSlice";
import AuthCard from "../AuthCard/AuthCard";
import classes from "./Register.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameWasTouched, setNameWasTouched] = useState(false);
  const [emailWasTouched, setEmailWasTouched] = useState(false);
  const [passwordWastouched, setPasswordWasTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const dispatch = useDispatch();

  const emailValidationRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  const emailIsValid = emailValidationRegex.test(email);
  const emailIsInvalid = !emailIsValid && emailWasTouched;
  const passwordIsValid = password.length > 5;
  const passwordInputIsInvalid = !passwordIsValid && passwordWastouched;
  const nameIsValid = name.length > 5;
  const nameIsInvalid = !nameIsValid && nameWasTouched;
  const emailInputClasses = emailIsInvalid ? classes.invalid : " ";
  const passwordInputClasses = passwordInputIsInvalid ? classes.invalid : " ";
  const nameInputClasses = nameIsInvalid ? classes.invalid : " ";

  const onUsernameChange = (e) => {
    setName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return; //Do not submit form if form is invalid
    }

    const userInfo = {
      name,
      email,
      password,
    };

    dispatch(registerUser(userInfo));
  };

  const onNameBlur = (e) => {
    setNameWasTouched(true);
  };

  const onEmailBlur = (e) => {
    setEmailWasTouched(true);
  };

  const onPasswordBlur = (e) => {
    setPasswordWasTouched(true);
  };

  useEffect(() => {
    if (nameIsValid && passwordIsValid && emailIsValid) {
      setFormIsValid(true);
    }
  }, [emailIsValid, passwordIsValid, nameIsValid]);

  return (
    <>
      <AuthCard header="Register" mainScreen="login" submit={onSubmit}>
        <Form.Group className="mb-3" controlId="registerUsername">
          <Form.Control
            type="text"
            name="username"
            value={name}
            onChange={onUsernameChange}
            placeholder="Username"
            onBlur={onNameBlur}
            className={nameInputClasses}
          />
          {nameIsInvalid && (
            <p className={classes.message}>
              Name must be at least 6 characters
            </p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="registerEmail">
          <Form.Control
            type="text"
            name="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Email"
            onBlur={onEmailBlur}
            className={emailInputClasses}
          />
          {emailIsInvalid && (
            <p className={classes.message}>
              Email must be a valid email address
            </p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="registerPassword">
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
      </AuthCard>
    </>
  );
};

export default Register;
