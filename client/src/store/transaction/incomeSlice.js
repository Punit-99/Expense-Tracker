import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const initialState = {
  income: [],
  isLoading: false,
  error: null,
};

// Get Token from Local Storage
const getToken = () => localStorage.getItem("token");

// Fetch Income (User-Specific)
export const fetchIncome = createAsyncThunk("income/fetch", async () => {
  const response = await axios.get(`${BASE_URL}get-income`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    withCredentials: true,
  });
  return response.data;
});

// Add Income (User-Specific)
export const addIncome = createAsyncThunk("income/add", async (incomeData) => {
  const formattedIncome = {
    title: incomeData.incomeTitle,
    amount: Number(incomeData.incomeAmount),
    date: new Date(incomeData.incomeDate),
    category: incomeData.incomeCategory,
    description: incomeData.incomeDescription,
  };

  const response = await axios.post(`${BASE_URL}add-income`, formattedIncome, {
    headers: { Authorization: `Bearer ${getToken()}` },
    withCredentials: true,
  });

  return response.data;
});

// Delete Income (User-Specific)
export const deleteIncome = createAsyncThunk("income/delete", async (id) => {
  await axios.delete(`${BASE_URL}delete-income/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    withCredentials: true,
  });

  return id;
});

// Download Expense PDF
export const downloadIncomePDF = createAsyncThunk(
  "income/downloadPDF",
  async () => {
    const response = await axios.get(`${BASE_URL}download-income-pdf`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      responseType: "blob", // Must be blob for file download
      withCredentials: true,
    });

    // Trigger the browser to download the PDF
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "income.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();

    return true;
  }
);

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.income = action.payload;
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.income.push(action.payload);
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.income = state.income.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default incomeSlice.reducer;
