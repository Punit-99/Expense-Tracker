import { useContext, useState } from "react";
import { GlobalContext } from "../../context/globalContext";
import formControls from "../../config/configIndex";
import CommonForm from "../../components/common-form/commonForm";
import { FaPlus } from "react-icons/fa6";
import { ScrollArea } from "@/components/ui/scroll-area";
import RecentHistroy from "../../components/recentHistory/recentHistory";
const Income = () => {
  const { IncomeFormControl } = formControls;
  const { addIncome, deleteIncome, calculateTotal, income } =
    useContext(GlobalContext);

  const initialFormState = {
    salaryTitle: "",
    SalaryAmount: "",
    SalaryDate: "",
    SalaryCategory: "",
    SalaryDescription: "",
  };

  const [incomeFormData, setIncomeFormData] = useState(initialFormState);

  function onHandleSubmit(e) {
    e.preventDefault();
    addIncome(incomeFormData);
    setIncomeFormData(initialFormState);
  }

  // Function to check if all required fields are filled
  const isFormValid = () => {
    return Object.values(incomeFormData).every((value) => {
      // Check if the value is a string, and then trim it
      return typeof value === "string" ? value.trim() !== "" : value !== "";
    });
  };

  return (
    <>
      <div className="font-bold text-4xl m-4 text-gray-800">Income</div>
      <div className="flex-1 bg-gray-100 rounded-lg p-6 m-4">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-center ">
            Total:
            <span className={income === 0 ? "text-red-500" : "text-green-500"}>
              ${calculateTotal(income)}
            </span>
          </h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start mx-4 space-y-4 md:space-y-0">
        <div className="flex-1 bg-gray-100 shadow-md rounded-lg p-6 h-[452px]">
          <CommonForm
            formControl={IncomeFormControl}
            formData={incomeFormData}
            setFormData={setIncomeFormData}
            onHandleSubmit={onHandleSubmit}
            buttonText={" Add Income"}
            buttonVarient={"success"}
            ButtonIcon={<FaPlus />}
            dateFieldName="SalaryDate" // Add this line
            disabled={!isFormValid()} // Disable button if form is not valid
          />
        </div>

        <div className="flex-1 bg-gray-100 shadow-md rounded-lg p-6 mt-4 md:mt-0 md:ml-4">
          <h2 className="text-xl font-semibold mb-4">Income History</h2>
          <ScrollArea className="h-[360px]">
            <RecentHistroy
              transactions={income}
              onDelete={deleteIncome}
              isIncome={true}
            />
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default Income;
