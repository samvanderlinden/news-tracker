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
      state.favoriteArticles = state.favoriteArticles.push(action.payload);
    },
  },
});

export const { addToFavorites } = favoriteArticles.actions;

export const addArticle = (article) => async (dispatch) => {
  const authToken = localStorage.getItem("jwtToken");

  const articleInfoToSave = {
    source: article.source.id,
    author: article.author,
    title: article.title,
    description: article.description,
    content: article.content,
  };

  const response = await axios.post(
    `http://localhost:5000/api/articles`,
    articleInfoToSave,
    {
      headers: {
        "auth-token": authToken,
      },
    }
  );

  console.log(response);

  dispatch(addToFavorites(articleInfoToSave));
};

export default favoriteArticles.reducer;
