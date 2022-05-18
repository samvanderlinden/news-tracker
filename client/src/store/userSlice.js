import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  favoriteArticles: [],
};

export const favoriteArticles = createSlice({
  name: "favoriteArticles",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.favoriteArticles.push(action.payload);
    },
    getFavorites: (state, action) => {
      state.favoriteArticles = action.payload;
    },
    deleteFavorite: (state, action) => {
      state.favoriteArticles.filter((article) => {
        return article._id !== action.payload;
      });
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
    const response = await axios.post(
      `http://localhost:5000/api/articles`,
      articleInfoToSave,
      {
        headers: {
          "auth-token": authToken,
        },
      }
    );

    if (
      response.data.message !==
      "This article has already been saved to your favorites"
    ) {
      dispatch(addToFavorites(articleInfoToSave));
    }
  } catch (err) {
    console.log(err);
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
  } catch (error) {
    console.log(error);
  }
};

export const { addToFavorites, getFavorites, deleteFavorite } =
  favoriteArticles.actions;

export default favoriteArticles.reducer;
