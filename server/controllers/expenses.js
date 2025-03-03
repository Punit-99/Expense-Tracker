const ExpenseSchema = require("../models/expenseModel");

const addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const expense = new ExpenseSchema({
    userId: req.user.id, // Assign the logged-in user's ID
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (amount <= 0 || typeof amount !== "number") {
      return res.status(400).json({ message: "Amount must be positive" });
    }

    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await ExpenseSchema.findOne({ _id: id, userId: req.user.id });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.deleteOne();
    res.status(200).json({ message: "Expense Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addExpense, getExpense, deleteExpense };
