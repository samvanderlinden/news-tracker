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
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.jwtToken = null;
    },
    register: (state, action) => {},
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
  //dispatch(register(userInfo))
};

// export const fetchArticles = (searchTerm) => async (dispatch) => {
//   const response = await axios(
//     `http://localhost:5000/api/articles/top-headlines/${searchTerm}`
//   );

//   dispatch(searchArticles(response.data.articles));
// };

export default authSlice.reducer;
