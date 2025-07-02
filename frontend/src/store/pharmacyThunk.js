import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/pharmacy",
  withCredentials: true,
});

// Helper function to get token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
};

// Medicines CRUD operations
export const fetchMedicines = createAsyncThunk(
  "pharmacy/fetchMedicines",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/medicines", getAuthHeader());
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch medicines"
      );
    }
  }
);

export const createMedicine = createAsyncThunk(
  "pharmacy/createMedicine",
  async (medicineData, { rejectWithValue }) => {
    try {
      const response = await API.post(
        "/medicines",
        medicineData,
        getAuthHeader()
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create medicine"
      );
    }
  }
);

export const updateMedicine = createAsyncThunk(
  "pharmacy/updateMedicine",
  async ({ medicineId, medicineData }, { rejectWithValue }) => {
    try {
      const response = await API.put(
        `/medicines/${medicineId}`,
        medicineData,
        getAuthHeader()
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update medicine"
      );
    }
  }
);

export const deleteMedicine = createAsyncThunk(
  "pharmacy/deleteMedicine",
  async (medicineId, { rejectWithValue }) => {
    try {
      await API.delete(`/medicines/${medicineId}`, getAuthHeader());
      return medicineId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete medicine"
      );
    }
  }
);
export const fetchAllMedicines = createAsyncThunk(
  "medicines/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("http://localhost:5001/api/medicines/all-medicines"); // Add search query if needed
      console.log("This Is tHE Res In Get All Medicine,", res);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete medicine"
      );
    }
  }
);
// Ajoutez ces fonctions à votre pharmacyThunk.js
export const fetchCategories = createAsyncThunk(
  "pharmacy/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/categories", getAuthHeader());
      console.log("This Is The Response", response.data.data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "pharmacy/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await API.post(
        "/categories",
        categoryData,
        getAuthHeader()
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create category"
      );
    }
  }
);

export const fetchPharmacyReviews = createAsyncThunk(
  "pharmacy/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/reviews", getAuthHeader());
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);

export const deleteReview = createAsyncThunk(
  "pharmacy/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      await API.delete(`/reviews/${reviewId}`, getAuthHeader());
      return reviewId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete review"
      );
    }
  }
);
export const fetchOrders = createAsyncThunk(
  "pharmacy/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/orders", getAuthHeader());
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

const initialState = {
  medicines: [],
  loading: false,
  error: null,
  categories: [],
};

const pharmacySlice = createSlice({
  name: "pharmacy",
  initialState,
  reducers: {
    // You can add other reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // Fetch Medicines
      .addCase(fetchMedicines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicines.fulfilled, (state, action) => {
        console.log("This Is The Medicine Data", action.payload);
        state.loading = false;
        state.medicines = action.payload;
      })
      .addCase(fetchMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Medicine
      .addCase(createMedicine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMedicine.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines.push(action.payload);
      })
      .addCase(createMedicine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Medicine
      .addCase(updateMedicine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMedicine.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.medicines.findIndex(
          (med) => med._id === action.payload._id
        );
        if (index !== -1) {
          state.medicines[index] = action.payload;
        }
      })
      .addCase(updateMedicine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Medicine
      .addCase(deleteMedicine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMedicine.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = state.medicines.filter(
          (med) => med._id !== action.payload
        );
      })
      .addCase(deleteMedicine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        console.log("This Is The Category Data", action.payload);
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPharmacyReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPharmacyReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchPharmacyReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload
        );
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllMedicines.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMedicines.fulfilled, (state, action) => {
        console.log("This Is The Medicines", action.payload);
        state.loading = false;
        state.medicines = action.payload;
      })
      .addCase(fetchAllMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default pharmacySlice.reducer;
