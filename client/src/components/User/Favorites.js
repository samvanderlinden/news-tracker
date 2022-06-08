import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardGroup, Row, Card, Button, Form } from "react-bootstrap";
import { getFavoriteArticles } from "../../store/userSlice";
import { deleteArticle, filterFavoriteArticles } from "../../store/userSlice";
import noImage from "../../assets/image-not-found-1-scaled.png";
import classes from "./UserCard.module.css";

const Favorites = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const favoriteArticles = useSelector((state) => state.user.favoriteArticles);

  const dispatch = useDispatch();

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);

    dispatch(filterFavoriteArticles(e.target.value));
  };

  const onDeleteArticle = (article) => {
    dispatch(deleteArticle(article._id));
  };

  useEffect(() => {
    dispatch(getFavoriteArticles());
  }, [dispatch]);

  let listOfFavoriteArticles;

  if (favoriteArticles) {
    listOfFavoriteArticles = favoriteArticles.map((article) => {
      const image = article.urlToImage ? article.urlToImage : noImage;
      return (
        <Card key={article.title} className={classes.card}>
          <Card.Img
            variant="top"
            src={image}
            className={classes["card-image"]}
          />
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>{article.description}</Card.Text>
            <Button
              variant="outline-danger"
              onClick={() => onDeleteArticle(article)}
            >
              Delete from Favorites
            </Button>
          </Card.Body>
        </Card>
      );
    });
  }

  return (
    <div>
      <Form.Group controlId="articleSearch">
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search for favorite articles (by title)"
          className={classes.searchInput}
        />
      </Form.Group>
      {listOfFavoriteArticles && listOfFavoriteArticles.length === 0 && (
        <h3 style={{ color: "white" }}>No articles have been saved</h3>
      )}
      <CardGroup>
        <Row xs={1} sm={2} md={3} className={classes.row}>
          {listOfFavoriteArticles}
        </Row>
      </CardGroup>
    </div>
  );
};

export default Favorites;
