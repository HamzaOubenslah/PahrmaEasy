// redux/pharmacy/pharmacyThunk.js
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5001/api/pharmacy";
const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Helper function to set headers with token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
};

// Orders
export const fetchPharmacyOrders = createAsyncThunk(
  "pharmacy/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/orders`, getAuthHeaders());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "pharmacy/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/orders/${orderId}/status`,
        { status },
        getAuthHeaders()
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  }
);

// Profile
export const fetchPharmacyProfile = createAsyncThunk(
  "pharmacy/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/profile`, getAuthHeaders());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// export const updateProfile = createAsyncThunk(
//   "pharmacy/updateProfile",
//   async (profileData, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `${API_URL}/profile`,
//         profileData,
//         getAuthHeaders()
//       );
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to update profile"
//       );
//     }
//   }
// );


export const updateProfile = createAsyncThunk(
  "pharmacy/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      // Get headers with auth token
      const headers = {
        ...getAuthHeaders().headers,
        "Content-Type": "multipart/form-data" // Override content-type for file upload
      };
      
      const response = await axios.put(
        `${API_URL}/profile`,
        formData,
        { headers }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);




export const changePassword = createAsyncThunk(
  "pharmacy/changePassword",
  async (
    { currentPassword, newPassword },
    { rejectWithValue }
  ) => {
    try {
      await axios.patch(
        `${API_URL}/change-password`,
        { currentPassword, newPassword },
        getAuthHeaders()
      );
      return { success: true };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change password"
      );
    }
  }
);

export const fetchPharmacyMedicines = createAsyncThunk(
  'pharmacy/fetchMedicines',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/medicines`, getAuthHeaders());
      return response.data.data; // Assuming your ApiResponse wraps data in data property
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchPharmacies=createAsyncThunk(
  'pharmacy/fetchAllPharmacies',
  async(_,{rejectWithValue})=>{
    try {
      const response=await API.get('/');
      console.log("This Is The Reponse From Fetch Pharmaes",response)
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
)

export const fetchPharmacyDetails = createAsyncThunk(
  "pharmacy/fetchPharmacyDetails",
  async (pharmacyId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/${pharmacyId}`, getAuthHeaders());
      return response.data.data; // Return pharmacy data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch pharmacy details"
      );
    }
  }
);

const initialState = {
  orders: [],
  profile: null,
  loading: false,
  error: null,
  success: false,
  medicines :[],
  pharmacies: [],
  pharmacyDetail:null
};

const pharmacySlice = createSlice({
  name: "pharmacy",
  initialState,
  reducers: {
    clearPharmacyData: (state) => {
      state.orders = [];
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchPharmacyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPharmacyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchPharmacyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Profile
      .addCase(fetchPharmacyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPharmacyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchPharmacyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //fetch medicines 
      .addCase(fetchPharmacyMedicines.pending, (state) => {
      state.loading = true;
      })
      .addCase(fetchPharmacyMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = action.payload;
        state.error = null;
      })
      .addCase(fetchPharmacyMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(fetchPharmacies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPharmacies.fulfilled, (state, action) => {
        state.loading = false;
        state.pharmacies = action.payload;
        state.error = null;
      })
      .addCase(fetchPharmacies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(fetchPharmacyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPharmacyDetails.fulfilled, (state, action) => {
        console.log("This Is The Pharmacy Details",action.payload)
        state.loading = false;
        state.pharmacyDetail = action.payload;
      })
      .addCase(fetchPharmacyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPharmacyData } = pharmacySlice.actions;
export default pharmacySlice.reducer;