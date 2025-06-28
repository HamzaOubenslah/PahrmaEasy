// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authThunk/authThunk";
import pharmacyReducer from './pharmacyThunk/pharmacyThunk'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    pharmacy:pharmacyReducer
  },
});
