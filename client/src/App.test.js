import React from "react";
import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "./store/authSlice";
import App from "./App";

it("renders welcome message", () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText("Learn React")).toBeInTheDocument();
});
