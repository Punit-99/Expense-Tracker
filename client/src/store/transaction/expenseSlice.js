import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const initialState = {
  expense: [],
  isLoading: false,
  error: null,
};

// Get Token from Local Storage
const getToken = () => localStorage.getItem("token");

// Fetch Expenses (User-Specific)
export const fetchExpense = createAsyncThunk("expense/fetch", async () => {
  const response = await axios.get(`${BASE_URL}get-expense`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    withCredentials: true,
  });
  return response.data;
});

// Add Expense (User-Specific)
export const addExpense = createAsyncThunk(
  "expense/add",
  async (expenseData) => {
    const formattedExpense = {
      title: expenseData.expenseTitle,
      amount: Number(expenseData.expenseAmount),
      date: new Date(expenseData.expenseDate),
      category: expenseData.expenseCategory,
      description: expenseData.expenseDescription,
    };

    const response = await axios.post(
      `${BASE_URL}add-expense`,
      formattedExpense,
      {
        headers: { Authorization: `Bearer ${getToken()}` },
        withCredentials: true,
      }
    );

    return response.data;
  }
);

// Delete Expense (User-Specific)
export const deleteExpense = createAsyncThunk("expense/delete", async (id) => {
  await axios.delete(`${BASE_URL}delete-expense/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    withCredentials: true,
  });

  return id;
});

// Download Expense PDF
export const downloadExpensePDF = createAsyncThunk(
  "expense/downloadPDF",
  async () => {
    const response = await axios.get(`${BASE_URL}download-expense-pdf`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      responseType: "blob", // Must be blob for file download
      withCredentials: true,
    });

    // Trigger the browser to download the PDF
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();

    return true;
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expense = action.payload;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expense.push(action.payload);
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expense = state.expense.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default expenseSlice.reducer;
