// src/components/Dashboard.js
import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import IncomeExpenseChart from "../../components/transactionchart/IncomeExpenseChart";
import RecentHistory from "../../components/recentHistory/recentHistory"; // Import your RecentHistory component
import AmountBoxes from "../../components/amountBoxes/amountBoxes";

const Dashboard = () => {
  const { recentHistory, income, expense } = useContext(GlobalContext);

  {
    console.log(recentHistory());
  }
  return (
    <>
      <div className="font-bold text-2xl m-4 text-gray-800">Dashboard</div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 m-4">
        <div className="bg-gray-100 rounded-lg shadow-md p-6 flex justify-center items-center">
          <IncomeExpenseChart income={income} expense={expense} />
        </div>

        <div className="bg-gray-100 rounded-lg shadow-md p-6 h-max-[240px]">
          <h2 className="text-lg font-medium mb-4">Recent History</h2>
          <RecentHistory transactions={recentHistory()} isDashboard={true} />
        </div>

        <div className="flex gap-4 p-5 bg-gray-100 rounded-lg shadow-md">
          <AmountBoxes />
        </div>

        <div className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col justify-center items-center space-y-6">
          {/* MAP */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
