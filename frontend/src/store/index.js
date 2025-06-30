// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authThunk/authThunk";
import pharmacyReducer from "./pharmacyThunk"
import cartThunk from "./cartThunk/cartThunk";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pharmacy : pharmacyReducer
    cart: cartThunk,
  },
});
