const { addIncome, getIncome, deleteIncome } = require("../controllers/income");
const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expenses");

const router = require("express").Router();

// Income routes
router.get("/get-income", getIncome);
router.post("/add-income", addIncome);
router.delete("/delete-income/:id", deleteIncome);

// Expense routes
router.get("/get-expense", getExpense);
router.post("/add-expense", addExpense);
router.delete("/delete-expense/:id", deleteExpense);

module.exports = router;

//Can also chain this ==>

// router
//   .post("/add-income", addIncome)
//   .get("/get-incomes", getIncome)
//   .delete("", deleteIncome);
