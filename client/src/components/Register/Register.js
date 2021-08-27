import { AuthContext } from "../../store/authContext";
import { useContext } from "react";
import { Form, Button, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import classes from './Register.module.css';

const Register = ({ setUsername, setEmail, setPassword }) => {
  const authCtxt = useContext(AuthContext);
  const { registerUsername, registerEmail, registerPassword } = authCtxt;

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className={classes['register-container']}>
      <Form className={classes['register-card']}>
        <div>
          <div className={classes['register-card-header']}>
            <h2>Register</h2>
          </div>
          <div className={classes['register-inputs']}>
            <Form.Group className="mb-3" controlId="registerUsername">
              <Col sm="10">
                <Form.Control type="text" name="username" value={registerUsername} onChange={onUsernameChange} placeholder="Username" />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="registerEmail">
              <Col sm="10">
                <Form.Control type="text" name="email" value={registerEmail} onChange={onEmailChange} placeholder="Email" />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="registerPassword">
              <Col sm="10">
                <Form.Control type="password" name="password" value={registerPassword} onChange={onPasswordChange} placeholder="Password" />
              </Col>
            </Form.Group>
            <Button type="submit" variant="primary" className={classes['submit-button']}>
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