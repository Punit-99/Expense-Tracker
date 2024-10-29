/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ selected, onChange, placeholder }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-between text-left font-normal ",
            !selected && "text-muted-foreground"
          )}
        >
          {selected ? (
            format(selected, "PPP")
          ) : (
            <span className=" font-medium text-black">{placeholder}</span>
          )}
          <CalendarIcon className=" text-black" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => {
            onChange(date);
          }}
          initialFocus
          minDate={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
          maxDate={
            new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
          }
        />
      </PopoverContent>
    </Popover>
  );
}
