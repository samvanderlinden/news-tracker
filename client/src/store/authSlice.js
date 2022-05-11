import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  jwtToken: null,
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
      state.isLoggedIn = true;
      state.jwtToken = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, register } = authSlice.actions;

export const registerUser = (userInfo) => async (dispatch) => {
  console.log("userInfo", userInfo);

  const response = await axios.post(
    "http://localhost:5000/api/user/register",
    userInfo
  );

  console.log("auth response", response);

  const token = response.data.newUser;

  dispatch(register(token));
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
