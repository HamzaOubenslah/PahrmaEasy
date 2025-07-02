import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/order",
  withCredentials: true,
});

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `bearer ${token}` } : {};
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.post(
        "/create-order",
        {},
        {
          headers: { ...getAuthHeader(), "Content-Type": "application/json" },
        }
      );
      console.log("This Is The Order Creation Response", response);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

export const uploadPrescription = createAsyncThunk(
  "order/uploadPrescription",
  async ({ pharmacy, ordonance }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("pharmacy", pharmacy);
      formData.append("ordonance", ordonance);

      const response = await API.post("/upload-ordonance", formData, {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("This Is The Response", response);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload prescription"
      );
    }
  }
);

// export const updateOrderStatus = createAsyncThunk(
//   "order/updateStatus",
//   async ({ orderId, status }, { rejectWithValue }) => {
//     try {
//       const response = await API.patch(
//         `/${orderId}/status`,
//         { status },
//         { headers: getAuthHeader() }
//       );
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to update order status"
//       );
//     }
//   }
// );

// Slice
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    error: null,
    uploadLoading: false,
    uploadError: null,
    statusLoading: false,
    statusError: null,
  },
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    clearUploadError: (state) => {
      state.uploadError = null;
    },
    clearStatusError: (state) => {
      state.statusError = null;
    },
    resetOrderState: (state) => {
      state.orders = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Order
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = [...state.orders, ...action.payload];
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Upload Prescription
    builder.addCase(uploadPrescription.pending, (state) => {
      state.uploadLoading = true;
      state.uploadError = null;
    });
    builder.addCase(uploadPrescription.fulfilled, (state, action) => {
      console.log("This Is The Upload Perscription", action.payload);
      state.uploadLoading = false;
      state.orders.push(action.payload);
    });
    builder.addCase(uploadPrescription.rejected, (state, action) => {
      state.uploadLoading = false;
      state.uploadError = action.payload;
    });

    // Fetch User Orders
    // builder.addCase(fetchUserOrders.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.orders = action.payload;
    // });
    // builder.addCase(fetchUserOrders.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });

    // Update Order Status
    // builder.addCase(updateOrderStatus.pending, (state) => {
    //   state.statusLoading = true;
    //   state.statusError = null;
    // });
    // builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
    //   state.statusLoading = false;
    //   state.orders = state.orders.map(order =>
    //     order._id === action.payload._id ? action.payload : order
    //   );
    // });
    // builder.addCase(updateOrderStatus.rejected, (state, action) => {
    //   state.statusLoading = false;
    //   state.statusError = action.payload;
    // });
  },
});

export const {
  clearOrderError,
  clearUploadError,
  clearStatusError,
  resetOrderState,
} = orderSlice.actions;

export default orderSlice.reducer;
