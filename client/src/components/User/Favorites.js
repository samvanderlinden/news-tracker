import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardGroup, Row, Card } from "react-bootstrap";
import { getFavoriteArticles } from "../../store/userSlice";
import noImage from "../../assets/image-not-found-1-scaled.png";
import classes from "./UserCard.module.css";

const Favorites = () => {
  const favoriteArticles = useSelector((state) => state.user.favoriteArticles);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavoriteArticles());
  }, [favoriteArticles, dispatch]);

  const listOfFavoriteArticles = favoriteArticles.map((article) => {
    const image = article.urlToImage ? article.urlToImage : noImage;
    return (
      <Card key={article.title} className={classes.card}>
        <Card.Img variant="top" src={image} className={classes["card-image"]} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.description}</Card.Text>
          {/* <Button
            variant="outline-primary"
            onClick={() => onAddToFavorites(article)}
          >
            Add to Favorites
          </Button> */}
        </Card.Body>
      </Card>
    );
  });

  return (
    <div>
      <h3>User Favorites</h3>
      <CardGroup>
        <Row xs={1} sm={2} md={3}>
          {listOfFavoriteArticles}
        </Row>
      </CardGroup>
    </div>
  );
};

export default Favorites;
