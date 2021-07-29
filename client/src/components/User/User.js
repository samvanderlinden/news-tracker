import { dummyData } from "../../dummy-data";

const User = (props) => {
  const articles = dummyData.map(article => {
    return <li key={article.source.id}>{article.title}</li>
  })
  return (
    <div>
      <h3>User component</h3>
      <button onClick={props.onLogout}>Logout</button>
      <ul>{articles}</ul>
    </div>
  )
}

export default User;