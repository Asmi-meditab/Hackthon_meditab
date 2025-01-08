// // src/redux/authSlice.js (or wherever your Redux slice is)
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   token: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.token = action.payload.token;
//     },
//     logout: (state) => {
//       state.token = null; // Reset the token to null on logout
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  username: null, // Add username to the initial state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username; // Save username in state
    },
    logout: (state) => {
      state.token = null;
      state.username = null; // Reset username on logout
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
