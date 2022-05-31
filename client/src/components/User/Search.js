import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Card, CardGroup, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import noImage from "../../assets/image-not-found-1-scaled.png";
import classes from "./UserCard.module.css";
import { fetchArticles } from "../../store/articlesSlice";
import { addArticle } from "../../store/userSlice";

const Search = () => {
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

    if (
      searchTerm === "" ||
      searchTerm === " " ||
      searchTerm === null ||
      searchTerm === undefined
    ) {
      return; //Do not submit form if empty
    }

    dispatch(fetchArticles(searchTerm));

    setSearchTerm("");
  };

  const onAddToFavorites = (article) => {
    dispatch(addArticle(article));

    Swal.fire({
      position: "bottom",
      icon: "success",
      title: "Article added to favorites",
      toast: true,
      timer: 2000,
      showConfirmButton: false,
    });
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
        <Form.Group controlId="articleSearch">
          <Form.Control
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search for articles"
            className={classes.searchInput}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className={classes.searchButton}
        >
          Search
        </Button>
      </Form>
      <CardGroup>
        <Row xs={1} sm={2} md={3} className={classes.row}>
          {mappedArticlesList}
        </Row>
      </CardGroup>
      {formIsSubmitted && articlesList && articlesList.length === 0 && (
        <p>No articles found with your search criteria</p>
      )}
    </div>
  );
};

export default Search;
