import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  favoriteArticles: [],
  errorMessage: null,
  articleAdded: null,
};

export const favoriteArticles = createSlice({
  name: "favoriteArticles",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      if (!action.payload.errorMessage) {
        state.favoriteArticles.push(action.payload.article);
        state.errorMessage = null;
        state.articleAdded = true;
      } else {
        state.errorMessage = action.payload.errorMessage;
        state.articleAdded = false;
      }
    },
    getFavorites: (state, action) => {
      state.favoriteArticles = action.payload;
      state.articleAdded = null;
    },
    deleteFavorite: (state, action) => {
      state.favoriteArticles = state.favoriteArticles.filter((article) => {
        return article._id !== action.payload;
      });
      state.articleAdded = null;
    },
  },
});

export const addArticle = (article) => async (dispatch) => {
  const authToken = localStorage.getItem("jwtToken");

  const articleInfoToSave = {
    source: article.source.id,
    author: article.author,
    title: article.title,
    description: article.description,
    content: article.content,
    urlToImage: article.urlToImage,
  };

  try {
    await axios.post(`http://localhost:5000/api/articles`, articleInfoToSave, {
      headers: {
        "auth-token": authToken,
      },
    });

    dispatch(
      addToFavorites({ article: articleInfoToSave, errorMessage: null })
    );
  } catch (err) {
    dispatch(
      addToFavorites({
        article: articleInfoToSave,
        errorMessage: err.response.data.error,
      })
    );
  }
};

export const getFavoriteArticles = () => async (dispatch) => {
  const authToken = localStorage.getItem("jwtToken");

  try {
    const response = await axios(`http://localhost:5000/api/articles`, {
      headers: {
        "auth-token": authToken,
      },
    });

    dispatch(getFavorites(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteArticle = (id) => async (dispatch) => {
  const authToken = localStorage.getItem("jwtToken");

  const articleId = id;

  try {
    const response = await axios.delete(
      `http://localhost:5000/api/articles/${articleId}`,
      {
        headers: {
          "auth-token": authToken,
        },
      }
    );

    dispatch(deleteFavorite(response.data._id));

    try {
      const response = await axios(`http://localhost:5000/api/articles`, {
        headers: {
          "auth-token": authToken,
        },
      });

      dispatch(getFavorites(response.data));
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const { addToFavorites, getFavorites, deleteFavorite } =
  favoriteArticles.actions;

export default favoriteArticles.reducer;
