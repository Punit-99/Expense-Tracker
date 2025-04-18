const IncomeSchema = require("../models/incomeModel");
const PDFDocument = require("pdfkit");

const addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const income = new IncomeSchema({
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

    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getIncome = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await IncomeSchema.findOne({ _id: id, userId: req.user.id });

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    await income.deleteOne();
    res.status(200).json({ message: "Income Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
const downloadIncomePDF = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomes = await IncomeSchema.find({ userId });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=income.pdf");

    doc.pipe(res);

    doc.fontSize(18).text("Income Report", { align: "center" });
    doc.moveDown();

    incomes.forEach((income, index) => {
      doc
        .fontSize(12)
        .text(
          `${index + 1}. ${income.title} - ₹${income.amount} (${
            income.category
          })`,
          { align: "left" }
        );
      doc
        .fontSize(10)
        .text(
          `Date: ${new Date(
            income.date
          ).toLocaleDateString()} | Description: ${income.description}`,
          { align: "left", indent: 20 }
        );
      doc.moveDown(0.5);
    });

    doc.end();
  } catch (err) {
    console.error("PDF generation failed:", err);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};
module.exports = { addIncome, getIncome, deleteIncome, downloadIncomePDF };
