// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authThunk/authThunk";
import cartThunk from "./cartThunk/cartThunk";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartThunk,
  },
});
