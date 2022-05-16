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
    getFavorites: (state, action) => {
      state.favoriteArticles = action.payload;
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
  };

  try {
    await axios.post(`http://localhost:5000/api/articles`, articleInfoToSave, {
      headers: {
        "auth-token": authToken,
      },
    });
  } catch (err) {
    console.log(err);
  }

  dispatch(addToFavorites(articleInfoToSave));
};

export const getFavoriteArticles = () => async (dispatch) => {
  const authToken = localStorage.getItem("jwtToken");

  try {
    const response = await axios(`http://localhost:5000/api/articles`, {
      headers: {
        "auth-token": authToken,
      },
    });

    console.log(response.data);

    dispatch(getFavorites(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const { addToFavorites, getFavorites } = favoriteArticles.actions;

export default favoriteArticles.reducer;
