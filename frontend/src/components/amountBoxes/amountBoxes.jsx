import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import { FaDollarSign } from "react-icons/fa6";

const AmountBoxes = () => {
  const { calculateTotal, income, expense } = useContext(GlobalContext);

  const boxData = [
    {
      title: "Total Income",
      content: calculateTotal(income),
      type: "income",
    },
    {
      title: "Total Expense",
      content: calculateTotal(expense),
      type: "expense",
    },
    {
      title: "Total Balance",
      content: calculateTotal(income) - calculateTotal(expense),
      type: "balance",
    },
  ];
  return (
    <>
      {boxData.map((singleBox, index) => (
        <div
          key={index}
          className="w-40 h-30 p-4 bg-white shadow-md rounded-xl"
        >
          <p className="text-xl font-medium text-center">
            {singleBox.title}
            <br />
            <span
              className={` flex justify-center align-middle mt-6 text-2xl  items-center 
                ${
                  singleBox.type === "income"
                    ? "text-green-500"
                    : singleBox.type === "balance"
                    ? "text-sky-500"
                    : "text-red-500"
                }`}
            >
              {<FaDollarSign />} {singleBox.content}
            </span>
          </p>
        </div>
      ))}
    </>
  );
};

export default AmountBoxes;
