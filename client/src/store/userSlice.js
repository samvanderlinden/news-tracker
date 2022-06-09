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
        state.errorMessage = false;
        state.articleAdded = true;
      } else {
        state.errorMessage = action.payload.errorMessage;
        state.articleAdded = false;
      }
    },
    getFavorites: (state, action) => {
      state.favoriteArticles = action.payload;
    },
    deleteFavorite: (state, action) => {
      state.favoriteArticles = state.favoriteArticles.filter((article) => {
        return article._id !== action.payload;
      });
    },
    resetArticleAdded: (state) => {
      state.errorMessage = null;
    },
    filterFavorites: (state, action) => {
      let regexCriteria = new RegExp(`${action.payload}`, "i");
      state.favoriteArticles = state.favoriteArticles.filter((article) => {
        return regexCriteria.test(article.title);
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
    url: article.url,
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

    //The Sweet Alert toast in Search.js renders based on the errorMessage state.
    //However, when the user attempts to add an article the Sweet Alert toast is rendered based on the current errorMessage state
    //instead of the errorMessage triggered from adding an article to Favorites.
    //Therefore the errorMessage needs to reset to null after each attempt to add an article
    setTimeout(() => {
      dispatch(resetArticleAdded());
    }, 1000);
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

export const filterFavoriteArticles = (search) => async (dispatch) => {
  const authToken = localStorage.getItem("jwtToken");

  try {
    const response = await axios(`http://localhost:5000/api/articles`, {
      headers: {
        "auth-token": authToken,
      },
    });

    dispatch(getFavorites(response.data));

    dispatch(filterFavorites(search));
  } catch (error) {
    console.log(error);
  }
};

export const {
  addToFavorites,
  getFavorites,
  deleteFavorite,
  filterFavorites,
  resetArticleAdded,
} = favoriteArticles.actions;

export default favoriteArticles.reducer;
