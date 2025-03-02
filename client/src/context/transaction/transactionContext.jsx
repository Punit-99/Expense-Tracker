import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

export const addIncome = async (incomeData) => {
  const formattedIncome = {
    title: incomeData.salaryTitle,
    amount: Number(incomeData.SalaryAmount),
    date: new Date(incomeData.SalaryDate),
    category: incomeData.SalaryCategory,
    description: incomeData.SalaryDescription,
  };

  try {
    await axios.post(`${BASE_URL}add-income`, formattedIncome);
  } catch (error) {
    console.error("Error adding income:", error.response?.data || error.message);
    throw error;
  }
};

export const getIncome = async () => {
  try {
    const response = await axios.get(`${BASE_URL}get-income`);
    return response.data || [];
  } catch (error) {
    console.error("Unable to fetch income:", error);
    throw error;
  }
};

export const deleteIncome = async (id) => {
  try {
    await axios.delete(`${BASE_URL}delete-income/${id}`);
  } catch (error) {
    console.error("Failed to delete income:", error);
    throw error;
  }
};

export const addExpense = async (expenseData) => {
  const formattedExpense = {
    title: expenseData.ExpenseTitle,
    amount: Number(expenseData.ExpenseAmount),
    date: new Date(expenseData.ExpenseDate),
    category: expenseData.ExpenseCategory,
    description: expenseData.ExpenseDescription,
  };

  try {
    await axios.post(`${BASE_URL}add-expense`, formattedExpense);
  } catch (error) {
    console.error("Error adding expense:", error.response?.data || error.message);
    throw error;
  }
};

export const getExpense = async () => {
  try {
    const response = await axios.get(`${BASE_URL}get-expense`);
    return response.data || [];
  } catch (error) {
    console.error("Unable to fetch expenses:", error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    await axios.delete(`${BASE_URL}delete-expense/${id}`);
  } catch (error) {
    console.error("Failed to delete expense:", error);
    throw error;
  }
};
