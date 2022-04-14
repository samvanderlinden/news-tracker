import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "./store/authSlice";
import App from "./App";

test(`Renders App component with "Learn React" text`, () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText(/learn react/i)).toBeInTheDocument();
});
