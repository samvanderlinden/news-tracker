import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "./store/authSlice";
import articlesReducer from "./store/articlesSlice";
import App from "./App";
import "./index.css";

const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
