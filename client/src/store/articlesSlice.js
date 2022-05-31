import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  articles: [],
  status: "idle",
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    articlesLoading: (state) => {
      state.status = "loading";
      state.articles = [];
    },
    searchArticles: (state, action) => {
      state.articles = action.payload;
      state.status = "idle";
    },
    resetArticles: (state) => {
      state.articles = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { searchArticles, resetArticles, articlesLoading } =
  articlesSlice.actions;

// Define a thunk that dispatches those action creators
export const fetchArticles = (searchTerm) => async (dispatch) => {
  const authToken = localStorage.getItem("jwtToken");

  try {
    dispatch(articlesLoading());

    const response = await axios(
      `http://localhost:5000/api/articles/top-headlines/${searchTerm}`,
      {
        headers: {
          "auth-token": authToken,
        },
      }
    );

    let uniqueArticles = [];

    //Filtering out articles by article title
    if (response.data.articles.length > 0) {
      const uniqueTitles = response.data.articles.map(
        (article) => article.title
      );

      uniqueArticles = response.data.articles.filter(
        (article, index) => !uniqueTitles.includes(article.title, index + 1)
      );
    }

    setTimeout(() => {
      dispatch(searchArticles(uniqueArticles));
    }, 3000);
  } catch (error) {
    console.log(error);
  }
};

export default articlesSlice.reducer;
