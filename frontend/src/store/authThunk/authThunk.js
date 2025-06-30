// === authThunk/authThunk.js ===
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

const token = localStorage.getItem("token");

// === ASYNC THUNKS ===
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await API.post("/login", { email, password });
      return { success: true, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.post("/refresh-token");
      return res.data;
    } catch (err) {
      return rejectWithValue("Token refresh failed");
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/profile", {
        headers: { Authorization: `bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/profile/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Profile update failed"
      );
    }
  }
);

export const fetchNearbyPharmacies = createAsyncThunk(
  "pharmacy/fetchNearbyPharmacies",
  async ({ lat, lng }, { rejectWithValue }) => {
    try {
      const res = await API.get(`/nearby?lat=${lat}&lng=${lng}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch pharmacies"
      );
    }
  }
);

// === INITIAL STATE ===
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  success: false,
  notifications: JSON.parse(localStorage.getItem("notifications")) || [],
  nearbyPharmacies: [],
};

// === SLICE ===
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      state.notifications = null;
      localStorage.removeItem("notifications");
    },
    setToken: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      if (user) state.user = user;
      localStorage.setItem("token", token);
      if (user) localStorage.setItem("user", JSON.stringify(user));
    },
    removeNotification: (state, action) => {
      console.log(
        "This Is The Type Of Type Notification",
        typeof state.notifications
      );
      console.log("This Is The Notification", state.notifications);
      state.notifications = state.notifications.filter(
        (n) => n._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, access_Token, notifications } = action.payload.data.data;
        console.log("This Is The Notifications Of This User", notifications);
        state.loading = false;
        state.user = user;
        state.token = access_Token;
        state.notifications = notifications;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", access_Token);
        localStorage.setItem("notifications", JSON.stringify(notifications));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        if (action.payload.user) state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.success = true;
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(fetchNearbyPharmacies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNearbyPharmacies.fulfilled, (state, action) => {
        state.loading = false;
        state.nearbyPharmacies = action.payload;
      })
      .addCase(fetchNearbyPharmacies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setToken, removeNotification } = authSlice.actions;
export default authSlice.reducer;
