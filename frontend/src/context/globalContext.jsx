/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
export const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [error, setError] = useState(null);

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
        await getIncome();
      } else {
        console.log("Failed to add income:", response);
      }
    } catch (error) {
      console.error(
        "Error adding income:",
        error.response ? error.response.data : error.message
      );
      setError(error);
    }
  };

  const getIncome = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-income`);
      const data = response.data;
      setIncome(data || []);
    } catch (error) {
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
    } catch (error) {
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
        await getExpense();
      } else {
        console.log("Failed to add expense:", response);
      }
    } catch (error) {
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
      const data = response.data;
      setExpense(data || []);
    } catch (error) {
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
    } catch (error) {
      setError(error);
    }
  };

  // Total
  function calculateTotal(entries) {
    let total = 0;

    for (const entry of entries) {
      total += entry.amount;
    }

    return total;
  }

  // Diffrence
  function amountDifference() {
    return calculateTotal(income) - calculateTotal(expense);
  }

  //minAmount
  function minMaxAmount(entries) {
    if (!entries || entries.length === 0) return null;
    let minAmount = Math.min(...entries.map((minItem) => minItem.amount));
    let maxAmount = Math.max(...entries.map((maxItem) => maxItem.amount));
    return { minAmount, maxAmount };
  }

  function recentHistory() {
    // Combine income and expense arrays, including a type field
    const combinedHistory = [
      ...income.map((entry) => ({ ...entry, type: "income" })),
      ...expense.map((entry) => ({ ...entry, type: "expense" })),
    ];

    // Sort by date and time in descending order
    const sortedHistory = combinedHistory.sort((a, b) => {
      const dateA = new Date(a.date).getTime(); // Get timestamp for a
      const dateB = new Date(b.date).getTime(); // Get timestamp for b

      return dateB - dateA; // Sort in descending order
    });

    // Return only the most recent 3 items
    return sortedHistory.slice(0, 3);
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
