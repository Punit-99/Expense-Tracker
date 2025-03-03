import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/auth";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: localStorage.getItem("token") || null, // Store token
};

// Register User
export const registerUser = createAsyncThunk("/auth/register", async (formData) => {
  const response = await axios.post(`${BASE_URL}/register`, formData, { withCredentials: true });
  return response.data;
});

// Login User
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(`${BASE_URL}/login`, formData, { withCredentials: true });
  
  if (response.data.success) {
    localStorage.setItem("token", response.data.token); // Store token on login
  }
  
  return response.data;
});

// Logout User
export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
  localStorage.removeItem("token"); // Remove token on logout
  return null;
});

// Check Authentication
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(`${BASE_URL}/check-auth`, {
    withCredentials: true,
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate" },
  });

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.token = action.payload.success ? action.payload.token : null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
