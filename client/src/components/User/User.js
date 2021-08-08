import { useState, useEffect } from "react";
import { dummyData } from "../../dummy-data";
import { Row, Card, CardGroup, Form, Button, Col } from 'react-bootstrap';
import noImage from '../../assets/image-not-found-1-scaled.png'
import classes from './UserCard.module.css'

const User = ({ onLogout }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [listOfArticles, setListofArticles] = useState([]);


  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const onSearchSubmit = (e) => {
    e.preventDefault();

    const articles = dummyData.map(article => {
      const image = article.urlToImage ? article.urlToImage : noImage
      return (
        <Card key={article.title} className={classes.card}>
          <Card.Img variant="top" src={image} className={classes['card-image']} />
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit longer.
            </Card.Text>
          </Card.Body>
        </Card>
      )
    });

    setListofArticles(articles);

    setSearchTerm('');

  }

  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm, listOfArticles])

  return (
    <div>
      <h3>User component</h3>

      <Button variant="secondary" onClick={onLogout}>Logout</Button>

      <Form onSubmit={onSearchSubmit}>
        <Form.Group className="mb-3" controlId="articleSearch">
          <Col sm="6">
            <Form.Control type="text" value={searchTerm} onChange={onSearchChange} placeholder="Search for articles" />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      <CardGroup>
        <Row xs={1} sm={2} md={3} >
          {listOfArticles}
        </Row>
      </CardGroup>
    </div>
  )
}

export default User;