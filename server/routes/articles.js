const express = require("express");
const axios = require("axios");
const route = express.Router();
const Article = require("../model/Article");
const User = require("../model/User");
const verify = require("./verifyToken");
const { JsonWebTokenError } = require("jsonwebtoken");

//ADD ARTICLE TO COLLECTION IF USER IS LOGGED IN
route.post("/", verify, async (req, res) => {
  const { source, author, description, content, title } = req.body;

  try {
    const article = new Article({
      source,
      author,
      content,
      description,
      title,
      savedBy: req.user._id,
    });

    // await Article.create(article);

    const user = await User.findById(req.user._id).exec();

    if (user) {
      const articleIndex = user.articles.findIndex(
        (articleToSave) => article.title === articleToSave.title
      );

      if (articleIndex < 0) {
        await Article.create(article);

        user.articles.push(article);

        user.save();

        res.json({ message: "Article saved!" });
      } else {
        res.json({
          message: "This article has already been saved to your favorites",
        });
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//GET ARTICLES FROM A SPECIFIC USER
route.get("/", verify, async (req, res) => {
  try {
    const articles = await Article.find({ savedBy: req.user._id }).exec();

    res.send(articles);
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

//GET ARTICLES FROM TOP HEADLINES
route.get("/top-headlines/:searchTerm", verify, async (req, res) => {
  const { searchTerm } = req.params;

  try {
    const articlesResponse = await axios.get(
      `https://newsapi.org/v2/top-headlines?q=${searchTerm}&apiKey=${process.env.NEWS_API_KEY}`
    );

    const articlesData = articlesResponse.data;

    res.send(articlesData);
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

//DELETE POST
route.delete("/:articleId", verify, async (req, res) => {
  try {
    const deletedArticle = await Article.findOneAndDelete({
      _id: req.params.articleId,
    });

    const user = await User.findById(req.user._id).exec();

    const filteredArticles = user.articles.filter(
      (article) => article._id.toString() !== req.params.articleId
    );

    user.posts = filteredArticles;

    await user.save();

    if (deletedArticle) res.status(200).json({ message: "article deleted" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = route;
