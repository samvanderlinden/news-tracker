import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { registerUser } from "../../store/authSlice";
import AuthCard from "../AuthCard/AuthCard";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

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

    const userInfo = {
      name,
      email,
      password,
    };

    dispatch(registerUser(userInfo));

    // setSearchTerm(e.target.value);

    // dispatch(fetchArticles(searchTerm));

    // setListofArticles(articlesList);

    // setSearchTerm("");
  };

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
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="registerEmail">
          <Form.Control
            type="text"
            name="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="registerPassword">
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Password"
          />
        </Form.Group>
      </AuthCard>
    </>
  );
};

export default Register;
