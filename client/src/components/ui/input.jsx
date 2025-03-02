/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  (
    { type, name, onChange, id, placeholder, value, className, ...props },
    ref
  ) => {
    return (
      <input
        name={name}
        id={id}
        type={type || "text"}
        value={value}
        placeholder={placeholder || "Enter Value Here"}
        onChange={onChange}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 placeholder:font-medium placeholder:text-black",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
