import { dummyData } from "../../dummy-data";

const User = ({ onLogout, setIsLoggedIn }) => {

  // useEffect(() => {
  //   setIsLoggedIn(true);
  // })

  const articles = dummyData.map(article => {
    return <li key={article.source.id}>{article.title}</li>
  })

  return (
    <div>
      <h3>User component</h3>
      <button onClick={onLogout}>Logout</button>
      <ul>{articles}</ul>
    </div>
  )
}

export default User;