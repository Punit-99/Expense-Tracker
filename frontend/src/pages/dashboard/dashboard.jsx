// src/components/Dashboard.js
import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import IncomeExpenseChart from "../../components/transactionchart/IncomeExpenseChart";
import RecentHistory from "../../components/recentHistory/recentHistory"; // Import your RecentHistory component
import AmountBoxes from "../../components/amountBoxes/amountBoxes";
import MinMaxBox from "../../components/minMaxBox/minMaxBox";

const Dashboard = () => {
  const { recentHistory, income, expense } = useContext(GlobalContext);

  return (
    <>
      <div className="font-bold text-4xl m-4 text-gray-800">Dashboard</div>
      <div className="flex flex-col gap-4 m-4">
        {/* First Sub-Parent: Row Layout */}
        <div className="flex flex-row gap-4">
          <div className="flex-1 bg-gray-100 rounded-lg shadow-md p-6 flex justify-center items-center">
            <IncomeExpenseChart income={income} expense={expense} />
          </div>

          <div className="flex-1 bg-gray-100 rounded-lg shadow-md p-6 h-max-[240px]">
            <h2 className="text-lg font-medium mb-4">Recent History</h2>
            <RecentHistory transactions={recentHistory()} isDashboard={true} />
          </div>
        </div>

        {/* Second Sub-Parent: Row Layout */}
        <div className="flex flex-row gap-4">
          <div className="flex-1 bg-gray-100 rounded-lg shadow-md p-5 flex justify-center items-center gap-5">
            <AmountBoxes />
          </div>

          <div className="flex-1 bg-gray-100 rounded-lg shadow-md p-4 flex flex-col justify-center items-center space-y-6">
            <MinMaxBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
