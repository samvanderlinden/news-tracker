import { AuthContext } from "../../store/authContext";
import { useContext } from "react";
import { Form, Col } from "react-bootstrap";
import AuthCard from "../AuthCard/AuthCard";

const Register = ({ setUsername, setEmail, setPassword }) => {
  const authCtxt = useContext(AuthContext);
  const { registerUsername, registerEmail, registerPassword } = authCtxt;

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <AuthCard header="Register" mainScreen="login" submit={authCtxt.register}>
        <Form.Group className="mb-3" controlId="registerUsername">
          <Col sm="10">
            <Form.Control
              type="text"
              name="username"
              value={registerUsername}
              onChange={onUsernameChange}
              placeholder="Username"
            />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" controlId="registerEmail">
          <Col sm="10">
            <Form.Control
              type="text"
              name="email"
              value={registerEmail}
              onChange={onEmailChange}
              placeholder="Email"
            />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" controlId="registerPassword">
          <Col sm="10">
            <Form.Control
              type="password"
              name="password"
              value={registerPassword}
              onChange={onPasswordChange}
              placeholder="Password"
            />
          </Col>
        </Form.Group>
      </AuthCard>
    </>
  );
};

export default Register;
