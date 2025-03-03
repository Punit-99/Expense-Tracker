/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncome } from "../../../store/transaction/incomeSlice";
import { fetchExpense } from "../../../store/transaction/expenseSlice";
import {
  FaTrash,
  FaMessage,
  FaCalendarDays,
  FaDollarSign,
  FaPlus,
  FaMinus,
} from "react-icons/fa6";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea from shadCN
import iconMapping from "../../../util/iconMap";

const RecentHistory = ({
  onDelete = null,
  isIncome = false,
  isDashboard = false,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIncome());
    dispatch(fetchExpense());
  }, [dispatch]);

  const income = useSelector((state) => state.income?.income || []);
  const expense = useSelector((state) => state.expense?.expense || []);

  let transactions = isIncome ? income : expense;

  // Merge and sort by date for dashboard
  if (isDashboard) {
    transactions = [...income, ...expense].sort(
      (a, b) => new Date(b.date) - new Date(a.date) // Latest first
    );
  }

  return isDashboard ? (
    <div className="p-4 w-full">
      <ScrollArea className="h-50 w-full rounded-md  p-4">
        <ul className="space-y-4">
          {transactions.length ? (
            transactions.map((transaction) => (
              <li
                key={transaction._id}
                className="flex justify-between items-center bg-white shadow-sm rounded-lg p-4 space-x-4"
              >
                <div className="flex justify-between items-center w-full">
                  <div
                    className={`font-bold text-lg ${
                      income.some((t) => t._id === transaction._id)
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.title || "Unknown Title"}
                  </div>
                  <div
                    className={`font-bold text-lg flex items-center ${
                      income.some((t) => t._id === transaction._id)
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {income.some((t) => t._id === transaction._id) ? (
                      <FaPlus className="mr-1" />
                    ) : (
                      <FaMinus className="mr-1" />
                    )}
                    <FaDollarSign className="mr-1" />
                    {transaction.amount !== undefined
                      ? transaction.amount
                      : "N/A"}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="flex justify-center text-red-500 align-middle">
              No Recent History
            </p>
          )}
        </ul>
      </ScrollArea>
    </div>
  ) : (
    <ul className="space-y-4">
      {transactions.length ? (
        transactions.map((transaction) => (
          <li
            key={transaction._id}
            className="flex justify-between items-center bg-white shadow-sm rounded-lg p-4 space-x-4"
          >
            <div className="flex justify-center items-center w-12 h-12 bg-gray-200 rounded-lg">
              <span className="text-lg">
                {iconMapping[transaction.category] || "❓"}
              </span>
            </div>

            <div className="flex flex-col flex-grow mx-4">
              <div className="font-bold text-lg">
                {transaction.title || "Unknown"}
              </div>
              <div className="flex gap-10 items-center">
                <div
                  className={`text-gray-600 flex items-center ${
                    isIncome ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <FaDollarSign />
                  {transaction.amount !== undefined
                    ? transaction.amount
                    : "N/A"}
                </div>
                <div className="text-gray-600 flex items-center">
                  <FaCalendarDays />
                  {transaction.date
                    ? new Date(transaction.date).toLocaleDateString()
                    : "No Date"}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <HoverCard>
                <HoverCardTrigger className="bg-slate-500 text-white hover:text-white hover:bg-slate-700 border border-slate-500 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                  <FaMessage size={17} />
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="p-2 text-gray-700">
                    {transaction.description || "No description available"}
                  </div>
                </HoverCardContent>
              </HoverCard>

              <button
                onClick={() => onDelete(transaction._id)}
                type="button"
                className="text-white border border-red-400 bg-red-400 hover:bg-red-500 hover:border-red-500 hover:text-white focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
              >
                <FaTrash size={17} />
              </button>
            </div>
          </li>
        ))
      ) : (
        <p className="flex justify-center text-red-500 align-middle">
          {isIncome
            ? "No income records available."
            : "No expense records available."}
        </p>
      )}
    </ul>
  );
};

export default RecentHistory;
