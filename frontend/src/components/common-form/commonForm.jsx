/* eslint-disable react/prop-types */
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../ui/datePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

const formTypes = {
  INPUT: "input",
  SELECT: "select",
  TEXTAREA: "textarea",
  DATEPICKER: "datepicker",
};

const CommonForm = ({
  formControl = [],
  formData,
  setFormData,
  buttonText,
  ButtonIcon = null,
  onHandleSubmit,
  buttonVarient,
  disabled,
  dateFieldName,
}) => {
  function renderFormElement(getCurrentElement) {
    let content = null;

    switch (getCurrentElement?.componentType) {
      case formTypes.INPUT:
        content = (
          <Input
            name={getCurrentElement.name}
            id={getCurrentElement.id}
            placeholder={getCurrentElement.placeholder}
            type={getCurrentElement.type}
            value={formData[getCurrentElement.name] || ""}
            onChange={(event) => {
              const { name, value } = event.target;

              // Check if the input field is for amount
              if (name === "SalaryAmount" || name === "ExpenseAmount") {
                // Parse the value as a number for the amount field
                const numericValue = parseFloat(value); // Use parseFloat for decimals

                // Update formData only if numericValue is non-negative or NaN (for clearing input)
                setFormData({
                  ...formData,
                  [name]:
                    numericValue >= 0 || isNaN(numericValue) ? numericValue : 0,
                });
              } else {
                // For other fields (like title), update directly
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }
            }}
            className="bg-white"
          />
        );
        break;

      case formTypes.TEXTAREA:
        content = (
          <Textarea
            name={getCurrentElement.name}
            id={getCurrentElement.id}
            placeholder={getCurrentElement.placeholder}
            value={formData[getCurrentElement.name] || ""}
            onChange={(event) =>
              setFormData({
                ...formData,
                [event.target.name]: event.target.value,
              })
            }
            className="bg-white"
          />
        );
        break;

      case formTypes.DATEPICKER:
        content = (
          <div className="flex items-center space-x-5">
            <DatePicker
              selected={formData[getCurrentElement.name]}
              onChange={(date) =>
                setFormData({
                  ...formData,
                  [getCurrentElement.name]: date,
                })
              }
              placeholder={getCurrentElement.placeholder}
            />
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="calendar"
                onClick={() => handleSetDate(-1)}
              >
                Yesterday
              </Button>
              <Button
                type="button"
                variant="calendar"
                onClick={() => handleSetDate(0)}
              >
                Today
              </Button>
            </div>
          </div>
        );
        break;

      case formTypes.SELECT:
        content = (
          <Select
            name={getCurrentElement.name}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getCurrentElement.name]: value,
              })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={getCurrentElement.placeholder}
                value={formData[getCurrentElement.name] || ""}
              />
            </SelectTrigger>
            <SelectContent>
              {getCurrentElement.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        break;

      default:
        content = null;
        break;
    }

    return content;
  }

  // Modified handleSetDate to accept the date field name
  function handleSetDate(offset) {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    setFormData({
      ...formData,
      [dateFieldName]: date, // Use the passed field name
    });
  }

  return (
    <form onSubmit={onHandleSubmit}>
      {formControl?.length
        ? formControl.map((singleFormElement) => (
            <div className="mb-3 border-black" key={singleFormElement.id}>
              {renderFormElement(singleFormElement)}
            </div>
          ))
        : null}
      <Button
        type="submit"
        variant={buttonVarient}
        size={"lg"}
        disabled={disabled}
      >
        {ButtonIcon} {buttonText}
      </Button>
    </form>
  );
};

export default CommonForm;
