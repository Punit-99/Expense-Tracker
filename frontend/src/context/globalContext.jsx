/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const BASE_URL = "http://localhost:5000/api/v1/";
export const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  // Add income
  const addIncome = async (incomeData) => {
    const formattedIncome = {
      title: incomeData.salaryTitle,
      amount: Number(incomeData.SalaryAmount),
      date: new Date(incomeData.SalaryDate),
      category: incomeData.SalaryCategory,
      description: incomeData.SalaryDescription,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}add-income`,
        formattedIncome
      );
      if (response.status === 200) {
        renderToast("Income Added", "success");
        await getIncome();
      } else {
        renderToast("Failed to add income", "destructive");
      }
    } catch (error) {
      renderToast("Failed to add income", "destructive");
      console.error(
        "Error adding income:",
        error.response ? error.response.data : error.message
      );
      setError(error);
    }
  };

  // Get income
  const getIncome = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-income`);
      setIncome(response.data || []);
    } catch (error) {
      renderToast("Unable to fetch income", "destructive");
      setError(error);
    }
  };

  // Delete income
  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      setIncome((prevIncome) =>
        prevIncome.filter((income) => income._id !== id)
      );
      renderToast("Income Deleted", "success");
    } catch (error) {
      renderToast("Failed to delete income", "destructive");
      setError(error);
    }
  };

  // Add expense
  const addExpense = async (expenseData) => {
    const formattedExpense = {
      title: expenseData.ExpenseTitle,
      amount: Number(expenseData.ExpenseAmount),
      date: new Date(expenseData.ExpenseDate),
      category: expenseData.ExpenseCategory,
      description: expenseData.ExpenseDescription,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}add-expense`,
        formattedExpense
      );
      if (response.status === 200) {
        renderToast("Expense Added", "success");
        await getExpense();
      } else {
        renderToast("Failed to add expense", "destructive");
      }
    } catch (error) {
      renderToast("Failed to add expense", "destructive");
      console.error(
        "Error adding expense:",
        error.response ? error.response.data : error.message
      );
      setError(error);
    }
  };

  // Get expense
  const getExpense = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expense`);
      setExpense(response.data || []);
    } catch (error) {
      renderToast("Unable to fetch expenses", "destructive");
      setError(error);
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      setExpense((prevExpense) =>
        prevExpense.filter((expense) => expense._id !== id)
      );
      renderToast("Expense Deleted", "success");
    } catch (error) {
      renderToast("Failed to delete expense", "destructive");
      setError(error);
    }
  };

  // Total
  function calculateTotal(entries) {
    return entries.reduce((total, entry) => total + entry.amount, 0);
  }

  // Difference
  function amountDifference() {
    return calculateTotal(income) - calculateTotal(expense);
  }

  // Min & Max Amount
  function minMaxAmount(entries) {
    if (!entries || entries.length === 0) return null;
    let minAmount = Math.min(...entries.map((item) => item.amount));
    let maxAmount = Math.max(...entries.map((item) => item.amount));
    return { minAmount, maxAmount };
  }

  // Recent History
  function recentHistory() {
    const combinedHistory = [
      ...income.map((entry) => ({ ...entry, type: "income" })),
      ...expense.map((entry) => ({ ...entry, type: "expense" })),
    ];

    return combinedHistory
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
  }

  // Render Toast
  function renderToast(description, variant) {
    toast({
      description,
      variant,
    });
  }

  useEffect(() => {
    getIncome();
    getExpense();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncome,
        deleteIncome,
        addExpense,
        getExpense,
        deleteExpense,
        calculateTotal,
        amountDifference,
        recentHistory,
        minMaxAmount,
        income,
        setIncome,
        expense,
        setExpense,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
