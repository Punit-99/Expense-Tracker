/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/globalContext";
import formControls from "../../config/configIndex";
import CommonForm from "../../components/common-form/commonForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaMinus } from "react-icons/fa6";
import RecentHistroy from "../../components/recentHistory/recentHistory";
const Expense = () => {
  const { ExpenseFormControl } = formControls;
  const { addExpense, deleteExpense, expense, calculateTotal, error } =
    useContext(GlobalContext);

  const initialFormState = {
    ExpenseTitle: "",
    ExpenseAmount: "",
    ExpenseDate: "",
    ExpenseCategory: "",
    ExpenseDescription: "",
  };

  const [expenseFormData, setExpenseFormData] = useState(initialFormState);

  function onHandleSubmit(e) {
    e.preventDefault();
    addExpense(expenseFormData);
    setExpenseFormData(initialFormState);
  }
  // Function to check if all required fields are filled
  const isFormValid = () => {
    return Object.values(expenseFormData).every((value) => {
      // Check if the value is a string, and then trim it
      return typeof value === "string" ? value.trim() !== "" : value !== "";
    });
  };
  return (
    <>
      <div className="font-bold text-4xl m-4 text-gray-800">Expense</div>
      <div className="flex-1 bg-gray-100 rounded-lg p-6 m-4">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-center ">
            Total:{" "}
            <span
              className={
                calculateTotal(expense) !== 0 ? "text-red-500" : "text-gray-700"
              }
            >
              ${calculateTotal(expense)}
            </span>
          </h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start mx-4 space-y-4 md:space-y-0">
        <div className="flex-1 bg-gray-100 shadow-md rounded-lg p-6 h-[452px]">
          <CommonForm
            formControl={ExpenseFormControl}
            formData={expenseFormData}
            setFormData={setExpenseFormData}
            onHandleSubmit={onHandleSubmit}
            buttonText={"Add Expense"}
            ButtonIcon={<FaMinus />}
            buttonVarient={"destructive"}
            dateFieldName="ExpenseDate"
            disabled={!isFormValid()}
          />
        </div>

        <div className="flex-1 bg-gray-100 shadow-md rounded-lg p-6 mt-4 md:mt-0 md:ml-4">
          <h2 className="text-xl font-semibold mb-4">Expense History</h2>
          <ScrollArea className="h-[360px]">
            <RecentHistroy
              transactions={expense}
              onDelete={deleteExpense}
              isIncome={false}
            />
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default Expense;
