import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Card, CardGroup, Form, Button, Col } from "react-bootstrap";
import noImage from "../../assets/image-not-found-1-scaled.png";
import classes from "./UserCard.module.css";
import { fetchArticles } from "../../store/articlesSlice";
import { addArticle } from "../../store/userSlice";

const User = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const articlesList = useSelector((state) => state.articles.articles);

  const token = useSelector((state) => state.auth.jwtToken);

  const onSearchSubmit = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);

    setFormIsSubmitted(true);

    // if (
    //   e.target.value === "" ||
    //   e.target.value === " " ||
    //   e.target.value === null ||
    //   e.target.value === undefined
    // ) {
    //   return;
    // }

    dispatch(fetchArticles(searchTerm));

    setSearchTerm("");
  };

  const onAddToFavorites = (article) => {
    dispatch(addArticle(article));
  };

  const mappedArticlesList = articlesList.map((article) => {
    const image = article.urlToImage ? article.urlToImage : noImage;
    return (
      <Card key={article.title} className={classes.card}>
        <Card.Img variant="top" src={image} className={classes["card-image"]} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.description}</Card.Text>
          <Button
            variant="outline-primary"
            onClick={() => onAddToFavorites(article)}
          >
            Add to Favorites
          </Button>
        </Card.Body>
      </Card>
    );
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("jwtToken", token);
    }
  }, [token]);

  return (
    <div>
      <Form onSubmit={onSearchSubmit}>
        <Form.Group className="mb-3" controlId="articleSearch">
          <Col sm="6">
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Search for articles"
            />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      <CardGroup>
        <Row xs={1} sm={2} md={3} lg={4}>
          {mappedArticlesList}
        </Row>
      </CardGroup>
      {/* {formIsSubmitted && articlesList.length === 0 && (
        <p>No articles found with your search criteria</p>
      )} */}
    </div>
  );
};

export default User;
