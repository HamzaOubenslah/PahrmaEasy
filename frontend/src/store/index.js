// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authThunk/authThunk";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
