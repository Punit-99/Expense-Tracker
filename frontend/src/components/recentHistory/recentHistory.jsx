/* eslint-disable react/prop-types */
import {
  FaTrash,
  FaMessage,
  FaCalendarDays,
  FaDollarSign,
} from "react-icons/fa6";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const RecentHistroy = ({ transactions, onDelete, isIncome }) => {
  return (
    <ul className="space-y-4">
      {transactions.length ? (
        transactions.map((transaction) => (
          <li
            key={transaction._id}
            className="flex justify-between items-center bg-white shadow-sm rounded-lg p-4 space-x-4"
          >
            {/* Image/Icon section */}
            <div className="flex justify-center items-center w-12 h-12 bg-gray-200 rounded-lg">
              <span className="text-gray-600">img</span>
            </div>

            {/* Title, Amount, Date section */}
            <div className="flex flex-col flex-grow mx-4">
              <div className="font-bold text-lg ">{transaction.title}</div>
              <div className="flex gap-10 items-center ">
                <div
                  className={`text-gray-600 flex items-center    ${
                    isIncome ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {<FaDollarSign />}
                  {transaction.amount}
                </div>
                <div className="text-gray-600 flex items-center">
                  <FaCalendarDays />
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <HoverCard>
                <HoverCardTrigger className=" bg-slate-500 text-white hover:text-white hover:bg-slate-700 border border-slate-500 focus:ring-4 focus:outline-none  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                  <FaMessage size={17} />
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="p-2 text-gray-700">
                    {transaction.description}
                  </div>
                </HoverCardContent>
              </HoverCard>

              <button
                onClick={() => onDelete(transaction._id)}
                type="button"
                className="text-white border border-red-400 bg-red-400 hover:bg-red-500 hover:border-red-500 hover:text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
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

export default RecentHistroy;
