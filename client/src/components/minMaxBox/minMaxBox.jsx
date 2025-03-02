import { useContext } from "react";
import { GlobalContext } from "../../context/globalStore";
import { FaDollarSign } from "react-icons/fa6";

const MinMaxBox = () => {
  const { minMaxAmount, income, expense } = useContext(GlobalContext);

  const { minAmount: minIncome, maxAmount: maxIncome } = minMaxAmount(
    income
  ) || {
    minAmount: 0,
    maxAmount: 0,
  };
  const { minAmount: minExpense, maxAmount: maxExpense } = minMaxAmount(
    expense
  ) || {
    minAmount: 0,
    maxAmount: 0,
  };

  const minMaxData = [
    { title: "Income", minValue: minIncome, maxValue: maxIncome },
    { title: "Expense", minValue: minExpense, maxValue: maxExpense },
  ];

  return (
    <>
      <div className="p-3 w-full">
        <ul className="space-y-6">
          {minMaxData.length ? (
            minMaxData.map((singleItem, index) => (
              <li key={index}>
                <div className=" flex items-center justify-between w-full text-gray-700 text-lg font-bold">
                  Min{" "}
                  <span className="  text-lg font-bold">
                    {singleItem.title}
                  </span>{" "}
                  Max
                </div>
                {/* safe */}
                <div className="bg-white border shadow-md rounded-xl p-2.5 flex justify-between items-center w-full mt-1">
                  <p className=" font-normal flex items-center text-orange-300 text-lg ">
                    <FaDollarSign /> {singleItem.minValue}
                  </p>
                  <p className=" font-normal flex items-center text-orange-300 text-lg">
                    <FaDollarSign /> {singleItem.maxValue}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p className="flex justify-center text-red-500">
              No Data Available
            </p>
          )}
        </ul>
      </div>
    </>
  );
};

export default MinMaxBox;
