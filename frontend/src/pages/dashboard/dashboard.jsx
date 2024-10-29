// src/components/Dashboard.js
import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import IncomeExpenseChart from "../../components/transactionchart/IncomeExpenseChart";
import RecentHistory from "../../components/recentHistory/recentHistory"; // Import your RecentHistory component

const Dashboard = () => {
  const { calculateTotal, recentHistory, minMaxAmount, income, expense } =
    useContext(GlobalContext);

  // Calculate totals and min/max values
  const totalIncome = calculateTotal(income);
  const totalExpense = calculateTotal(expense);
  const { minAmount: minIncome, maxAmount: maxIncome } = minMaxAmount(
    income
  ) || { minAmount: 0, maxAmount: 0 };
  const { minAmount: minExpense, maxAmount: maxExpense } = minMaxAmount(
    expense
  ) || { minAmount: 0, maxAmount: 0 };

  {
    console.log(recentHistory());
  }
  return (
    <>
      <div className="font-bold text-2xl m-4 text-gray-800">Dashboard</div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 m-4">
        {/* Top Left (Northwest) */}
        <div className="bg-gray-100 rounded-lg shadow-md p-6 flex justify-center items-center">
          <IncomeExpenseChart income={income} expense={expense} />
        </div>

        {/* Top Right (Northeast) */}
        <div className="bg-gray-100 rounded-lg shadow-md p-6 h-max-[240px]">
          <h2 className="text-lg font-medium mb-4">Recent History</h2>
          <div className="-lg p-4 w-full">
            <RecentHistory transactions={recentHistory()} isDashboard={true} />
          </div>
        </div>

        {/* Bottom Left (Southwest) */}
        <div className="flex gap-4 p-5 bg-gray-100 rounded-lg shadow-md">
          <div className="w-60 h-40 p-4 bg-white shadow-md rounded-xl ">
            <p className="text-xl font-medium text-center">
              Total Income
              <br />
              <span className="text-green-500">${totalIncome}</span>
            </p>
          </div>

          <div className="w-60 h-40 p-4 bg-white shadow-md rounded-xl ">
            <p className="text-xl font-medium text-center">
              Total Expense <br />
              <span className="text-red-500">${totalExpense}</span>
            </p>
          </div>

          <div className="w-60 h-40 p-4 bg-white shadow-md rounded-xl ">
            <p className="text-xl font-medium text-center">
              Balance <br />
              <span className="flex justify-center align-middle text-sky-500">
                ${totalIncome - totalExpense}
              </span>
            </p>
          </div>
        </div>

        {/* Bottom Right (Southeast) */}
        <div className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col justify-center items-center space-y-6">
          <h2 className="text-lg font-medium flex items-center justify-between w-full">
            Min <span className="text-base font-normal">Income</span> Max
          </h2>
          <div className="bg-white border-2 shadow-md rounded-xl p-4 flex justify-between items-center w-full">
            <p className="text-base font-normal">${minIncome}</p>
            <p className="text-base font-normal">${maxIncome}</p>
          </div>

          <h2 className="text-lg font-medium flex items-center justify-between w-full">
            Min <span className="text-base font-normal">Expense</span> Max
          </h2>
          <div className="bg-white border-2 shadow-md rounded-xl p-4 flex justify-between items-center w-full">
            <p className="text-base font-normal">${minExpense}</p>
            <p className="text-base font-normal">${maxExpense}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
