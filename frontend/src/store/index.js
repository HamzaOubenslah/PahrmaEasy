// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authThunk/authThunk";
import pharmacyReducer from "./pharmacyThunk/pharmacyThunk";
import cartThunk from "./cartThunk/cartThunk";
import medicineReducer from "./pharmacyThunk";
import orderReducer from "./orderThunk/orderThunk";
// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     pharmacy:pharmacyReducer
// import pharmacyReducer from "./pharmacyThunk"
// import cartThunk from "./cartThunk/cartThunk";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pharmacy: pharmacyReducer,
    cart: cartThunk,
    medicine: medicineReducer,
    order: orderReducer,
  },
});
