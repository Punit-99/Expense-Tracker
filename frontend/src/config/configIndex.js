const IncomeFormControl = [
  {
    name: "salaryTitle",
    id: "salaryTitle",
    placeholder: "Salary Title",
    componentType: "input", // Text input field
    type: "text",
  },
  {
    name: "SalaryAmount",
    id: "SalaryAmount ",
    placeholder: "Salary Amount",
    componentType: "input", // Text input field
    type: "number", // "number" type for better UX with numeric data
  },
  {
    name: "SalaryDate",
    id: "SalaryDate",
    placeholder: "Salary Date",
    componentType: "datepicker", // Calendar date picker
    type: "date",
  },
  {
    name: "SalaryCategory",
    id: "SalaryCategory",
    placeholder: "Salary Category",
    componentType: "select", // Dropdown menu
    options: [
      { label: "Salary", value: "salary" },
      { label: "Bonus", value: "bonus" },
      { label: "Freelance", value: "freelance" },
      { label: "Part-time Job", value: "part_time_job" },
      { label: "Investment Income", value: "investment_income" },
      { label: "Rental Income", value: "rental_income" },
      { label: "Dividends", value: "dividends" },
      { label: "Royalties", value: "royalties" },
      { label: "Commissions", value: "commissions" },
      { label: "Interest Income", value: "interest_income" },
      { label: "Gift", value: "gift" },
      { label: "Other", value: "other" },
    ],
  },
  {
    name: "SalaryDescription",
    id: "SalaryDescription",
    placeholder: "Salary Description",
    componentType: "textarea", // Multiline text area
    type: "text",
  },
];
// Expense
const ExpenseFormControl = [
  {
    name: "ExpenseTitle",
    id: "ExpenseTitle",
    placeholder: "Expense Title",
    componentType: "input", // Text input field
    type: "text",
  },
  {
    name: "ExpenseAmount",
    id: "ExpenseAmount",
    placeholder: "Expense Amount",
    componentType: "input", // Text input field
    type: "number", // "number" type for better UX with numeric data
  },
  {
    name: "ExpenseDate",
    id: "ExpenseDate",
    placeholder: "Expense Date",
    componentType: "datepicker", // Calendar date picker
    type: "date",
  },
  {
    name: "ExpenseCategory",
    id: "ExpenseCategory",
    placeholder: "Expense Category",
    componentType: "select", // Dropdown menu
    options: [
      { label: "Salary", value: "salary" },
      { label: "Bonus", value: "bonus" },
      { label: "Freelance", value: "freelance" },
      { label: "Part-time Job", value: "part_time_job" },
      { label: "Investment Income", value: "investment_income" },
      { label: "Rental Income", value: "rental_income" },
      { label: "Dividends", value: "dividends" },
      { label: "Royalties", value: "royalties" },
      { label: "Commissions", value: "commissions" },
      { label: "Interest Income", value: "interest_income" },
      { label: "Gift", value: "gift" },
      { label: "Other", value: "other" }, // For any other income sources
    ],
  },
  {
    name: "ExpenseDescription",
    id: "ExpenseDescription",
    placeholder: "Expense Description",
    componentType: "textarea", // Multiline text area
    type: "text",
  },
];
export default { IncomeFormControl, ExpenseFormControl };
