import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  jwtToken: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.jwtToken = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.jwtToken = null;
    },
    register: (state, action) => {
      if (!action.payload.errorMessage) {
        state.isLoggedIn = true;
        state.jwtToken = action.payload.jwtToken;
      } else {
        state.errorMessage = action.payload.errorMessage;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, register } = authSlice.actions;

export const registerUser = (userInfo) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/register",
      userInfo
    );

    const token = response.data.newUser;

    dispatch(register({ token: token, errorMessage: null }));
  } catch (err) {
    console.log(err.response.data.error);
    dispatch(register({ token: null, errorMessage: err.response.data.error }));
  }
};

export const loginUser = (userInfo) => async (dispatch) => {
  const response = await axios.post(
    "http://localhost:5000/api/user/login",
    userInfo
  );

  const token = response.data;

  dispatch(login(token));
};

export default authSlice.reducer;
