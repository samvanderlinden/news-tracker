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
  },
});

// Action creators are generated for each case reducer function
export const { searchArticles } = articlesSlice.actions;

// Define a thunk that dispatches those action creators
export const fetchArticles = (searchTerm) => async (dispatch) => {
  const response = await axios(
    `http://localhost:5000/api/articles/top-headlines/${searchTerm}`
  );

  dispatch(searchArticles(response.data.articles));
};

export default articlesSlice.reducer;
