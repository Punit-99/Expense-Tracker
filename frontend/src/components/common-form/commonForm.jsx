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
  onHandleSubmit,
  buttonVarient,
  disabled,
  dateFieldName, // Add this prop
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
              <Button type="button" onClick={() => handleSetDate(-1)}>
                Yesterday
              </Button>
              <Button type="button" onClick={() => handleSetDate(0)}>
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
        {buttonText}
      </Button>
    </form>
  );
};

export default CommonForm;
