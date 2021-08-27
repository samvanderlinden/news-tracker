import { useHistory } from "react-router";
import { AuthContext } from "../../store/authContext";
import { useContext } from "react";
import { Form, Button, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import classes from '../Login/Login.module.css';

const Register = () => {
  const authCtxt = useContext(AuthContext);
  const { username, email, password } = authCtxt;

  const onUsernameChange = (e) => {
    console.log(e.target.value);
  }

  const onEmailChange = (e) => {
    console.log(e.target.value);
  }

  const onPasswordChnage = (e) => {
    console.log(e.target.value)
  }
  console.log('register authCtxt', authCtxt);
  // let history = useHistory();

  // const handleClick = () => {
  //   history.push("/");
  // }

  return (
    <div className={classes['login-container']}>
      <Form className={classes['login-card']}>
        <div>
          <div className={classes['login-card-header']}>
            <h2>Register</h2>
          </div>
          <div className={classes['login-inputs']}>
            <Form.Group className="mb-3" controlId="registerUsername">
              <Col sm="10">
                <Form.Control type="text" name="username" value={username} onChange={onUsernameChange} placeholder="Username" />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="registerEmail">
              <Col sm="10">
                <Form.Control type="text" name="email" value={email} onChange={onEmailChange} placeholder="Email" />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="registerPassword">
              <Col sm="10">
                <Form.Control type="password" name="password" value={password} onChange={onPasswordChnage} placeholder="Password" />
              </Col>
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <br />
            <Link to="/">Back to Login</Link>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default Register