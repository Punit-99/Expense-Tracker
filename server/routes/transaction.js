const { addIncome, getIncome, deleteIncome } = require("../controllers/income");
const { addExpense, getExpense, deleteExpense } = require("../controllers/expenses");
const { authMiddleware } = require("../controllers/authController");

const router = require("express").Router();

// Income routes (protected)
router.get("/get-income", authMiddleware, getIncome);
router.post("/add-income", authMiddleware, addIncome);
router.delete("/delete-income/:id", authMiddleware, deleteIncome);

// Expense routes (protected)
router.get("/get-expense", authMiddleware, getExpense);
router.post("/add-expense", authMiddleware, addExpense);
router.delete("/delete-expense/:id", authMiddleware, deleteExpense);

module.exports = router;
