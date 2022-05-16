import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  articles: [],
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    searchArticles: (state, action) => {
      state.articles = action.payload;
    },
    resetArticles: (state) => {
      state.articles = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { searchArticles, resetArticles } = articlesSlice.actions;

// Define a thunk that dispatches those action creators
export const fetchArticles = (searchTerm) => async (dispatch) => {
  const authToken = localStorage.getItem("jwtToken");

  try {
    const response = await axios(
      `http://localhost:5000/api/articles/top-headlines/${searchTerm}`,
      {
        headers: {
          "auth-token": authToken,
        },
      }
    );

    dispatch(searchArticles(response.data.articles));
  } catch (error) {
    console.log(error);
  }
};

export default articlesSlice.reducer;
