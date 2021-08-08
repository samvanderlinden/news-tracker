import { useState } from "react";
import classes from './Login.module.css';
import { Form, Button, Col } from 'react-bootstrap';

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const onPasswordChnage = (e) => {
    setPassword(e.target.value);
  }

  const loginHandler = (e) => {
    e.preventDefault();
    props.setIsLoggedIn(true);
  }

  return (
    <div className={classes['login-container']}>
      <Form onSubmit={loginHandler} className={classes['login-card']}>
        <div>
          <div className={classes['login-card-header']}>
            <h2>Login</h2>
          </div>
          <div className={classes['login-inputs']}>
            <Form.Group className="mb-3" controlId="usernameLogin">
              <Col sm="10">
                <Form.Control type="text" name="username" value={email} onChange={onEmailChange} placeholder="Username" />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordLogin">
              <Col sm="10">
                <Form.Control type="password" name="password" value={password} onChange={onPasswordChnage} placeholder="Password" />
              </Col>
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default Login