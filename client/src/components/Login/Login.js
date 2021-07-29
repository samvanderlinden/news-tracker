import { useState } from "react"

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
    <div>
      <h3>Login Component</h3>
      <form onSubmit={loginHandler}>
        <label>
          Email:
          <input type="text" name="username" value={email} onChange={onEmailChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={onPasswordChnage} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Login