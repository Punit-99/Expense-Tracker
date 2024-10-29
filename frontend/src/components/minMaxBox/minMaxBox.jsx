import React from "react";

const minMaxBox = () => {
  return (
    <div>
      <h2 className="text-lg font-medium flex items-center justify-between w-full">
        Min <span className="text-base font-normal">Income</span> Max
      </h2>
      <div className="bg-white border-2 shadow-md rounded-xl p-4 flex justify-between items-center w-full">
        <p className="text-base font-normal">${minIncome}</p>
        <p className="text-base font-normal">${maxIncome}</p>
      </div>
    </div>
  );
};

export default minMaxBox;
// const { minAmount: minIncome, maxAmount: maxIncome } = minMaxAmount(income) || {
//   minAmount: 0,
//   maxAmount: 0,
// };
// const { minAmount: minExpense, maxAmount: maxExpense } = minMaxAmount(
//   expense
// ) || { minAmount: 0, maxAmount: 0 };
