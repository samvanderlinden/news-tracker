const Login = () => {
  return (
    <div>
      <h3>Login Component</h3>
      <form>
        <label>
          Username:
          <input type="text" name="userName" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Login