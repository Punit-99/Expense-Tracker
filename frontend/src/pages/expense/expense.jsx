/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/globalContext";
import formControls from "../../config/configIndex";
import CommonForm from "../../components/common-form/commonForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  FaTrash,
  FaMessage,
  FaCalendarDays,
  FaMoneyBill,
} from "react-icons/fa6";
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
            buttonVarient={"destructive"}
            dateFieldName="ExpenseDate" // Add this line
            disabled={!isFormValid()} // Disable button if form is not valid
          />
        </div>

        {/* History Section */}
        <div className="flex-1 bg-gray-100 shadow-md rounded-lg p-6 mt-4 md:mt-0 md:ml-4">
          <h2 className="text-xl font-semibold mb-4">Expense History</h2>
          <ScrollArea className="h-[360px]">
            <ul className="space-y-4">
              {expense?.length ? (
                expense.map((singleIncome) => (
                  <li
                    key={singleIncome._id}
                    className="flex justify-between items-center bg-white shadow-sm rounded p-4 space-x-4"
                  >
                    {/* Image section */}
                    <div className="flex justify-center items-center w-10 h-10 bg-gray-200 rounded-full">
                      <span className="text-gray-600">img</span>
                    </div>
                    {/* Content section */}
                    <div className="flex flex-col flex-grow">
                      <span className="font-bold text-lg ">
                        {singleIncome.title}
                      </span>
                      <div className="flex gap-20 mt-1">
                        <span className="flex items-center space-x-1">
                          <div className="flex items-center space-x-2">
                            {/*  */}
                            <span className="font-bold text-green-500 flex align-middle text-center ">
                              <FaMoneyBill />
                              {singleIncome.amount}
                            </span>
                            <span className="text-gray-500 flex items-center align-middle">
                              <FaCalendarDays />{" "}
                              {new Date(singleIncome.date).toLocaleDateString()}
                            </span>
                            {/*  */}
                          </div>
                        </span>
                      </div>
                    </div>
                    {/* HoverCard for description */}
                    <HoverCard>
                      <HoverCardTrigger className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                        <FaMessage size={17} />
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <div className="p-2 text-gray-700">
                          {singleIncome.description}
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                    {/* Trash Bin Button */}
                    <button
                      onClick={() => deleteExpense(singleIncome._id)}
                      type="button"
                      className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                    >
                      <FaTrash size={17} />
                    </button>
                  </li>
                ))
              ) : (
                <p className="flex justify-center text-red-500 align-middle">
                  No expense records available.
                </p>
              )}
            </ul>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default Expense;
