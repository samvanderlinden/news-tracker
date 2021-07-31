import { dummyData } from "../../dummy-data";
import { Grid, Row, Col, Card, CardGroup } from 'react-bootstrap';
import noImage from '../../assets/no-image.jpg'

const User = ({ onLogout }) => {

  const articles = dummyData.map(article => {
    const image = article.urlToImage ? article.urlToImage : noImage
    return (
      <Card key={article.title} style={{ 'overflow': 'auto' }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
      </Card>
    )
  })


  return (
    <div>
      <h3>User component</h3>
      <button onClick={onLogout}>Logout</button>
      <CardGroup>
        <Row xs={1} sm={2} md={3} >
          {articles}
        </Row>
      </CardGroup>
    </div>
  )
}

export default User;