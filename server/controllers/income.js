const IncomeSchema = require("../models/incomeModel");

const addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const income = IncomeSchema({
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
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getIncome = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes); // Send incomes directly
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteIncome = await IncomeSchema.findByIdAndDelete(id);
    if (deleteIncome) {
      res.status(200).json({ message: "Income Deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { addIncome, getIncome, deleteIncome };
