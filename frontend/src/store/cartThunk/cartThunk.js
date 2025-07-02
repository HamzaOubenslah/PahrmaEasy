import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create axios instance with default headers
const API = axios.create({
  baseURL: "http://localhost:5001/api/cart",
  withCredentials: true,
});

// Helper function to get auth token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `bearer ${token}` } : {};
};

// Async Thunks
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/", { headers: getAuthHeader() });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

export const addCart = createAsyncThunk(
  "cart/addCart",
  async ({ medicineId, quantity }, { rejectWithValue }) => {
    try {
      const res = await API.post(
        "/add",
        { medicineId, quantity },
        { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);

export const updateItemInCart = createAsyncThunk(
  "cart/updateItem",
  async ({ medicineId, quantity }, { rejectWithValue }) => {
    try {
      const res = await API.put(
        "/edit",
        { medicineId, quantity },
        { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart item"
      );
    }
  }
);

export const removeMedicineFromCart = createAsyncThunk(
  "cart/removeMedicine",
  async ({ medicineId }, { rejectWithValue }) => {
    try {
      const res = await API.delete(`/remove/${medicineId}`, {
        headers: getAuthHeader(),
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item from cart"
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.delete("/clear", { headers: getAuthHeader() });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

// Initial State
const initialState = {
  items: [],
  loading: false,
  error: null,
  totalItems: 0,
  totalPrice: 0,
  lastUpdated: null,
};

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: () => initialState,
    setCartItems: (state, action) => {
      state.items = action.payload.items || [];
      state.totalItems = action.payload.totalItems || 0;
      state.totalPrice = action.payload.totalPrice || 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Common pending state
      // .addMatcher(
      //   (action) => action.type.startsWith("cart/") && action.type.endsWith("/pending"),
      //   (state) => {
      //     state.loading = true;
      //     state.error = null;
      //   }
      // )

      // // Common error state
      // .addMatcher(
      //   (action) => action.type.startsWith("cart/") && action.type.endsWith("/rejected"),
      //   (state, action) => {
      //     state.loading = false;
      //     state.error = action.payload;
      //   }
      // )

      // Successful operations
      .addCase(getCart.fulfilled, (state, action) => {
        const { cart, totalPrice, totalItems } = action.payload.data;
        console.log(
          "This Is The Payload From GetCart Function",
          action.payload
        );
        state.loading = false;
        state.items = cart?.items || [];
        state.totalItems = totalItems || 0;
        state.totalPrice = totalPrice || 0;
        state.lastUpdated = Date.now();
        localStorage.setItem("cart-items", JSON.stringify(cart.items));
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data?.items || state.items;
        state.totalItems = action.payload.data?.totalItems || state.totalItems;
        state.totalPrice = action.payload.data?.totalPrice || state.totalPrice;
        state.lastUpdated = Date.now();
        localStorage.setItem("cart-items", JSON.stringify(state.items));
      })
      .addCase(updateItemInCart.fulfilled, (state, action) => {
        console.log(
          "This IS The Payload Of The Update Function",
          action.payload
        );
        const { items } = action.payload.data.cart;
        const { totalPrice, totalItems } = action.payload.data;
        state.loading = false;
        state.items = items;
        state.totalItems = totalItems;
        state.totalPrice = totalPrice;
        state.lastUpdated = Date.now();
      })
      .addCase(removeMedicineFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data?.items || state.items;
        state.totalItems = action.payload.data?.totalItems || state.totalItems;
        state.totalPrice = action.payload.data?.totalPrice || state.totalPrice;
        state.lastUpdated = Date.now();
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.totalItems = 0;
        state.totalPrice = 0;
        state.lastUpdated = Date.now();
        localStorage.getItem("cart-items", "[]");
      });
  },
});

export const { resetCartState, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
