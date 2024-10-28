const ExpenseSchema = require("../models/expenseModel");

const addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const income = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });
  console.log(income);

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Amount must be positive " });
    }

    await income.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getExpense = async (req, res) => {
  try {
    const Expense = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(Expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteIncome = await ExpenseSchema.findByIdAndDelete(id);
    if (deleteIncome) {
      res.status(200).json({ message: "Expense Deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { addExpense, getExpense, deleteExpense };
