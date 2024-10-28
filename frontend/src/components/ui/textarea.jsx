/* eslint-disable react/prop-types */
import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(
  (
    { name, id, type, value, placeholder, onChange, className, ...props },
    ref
  ) => {
    return (
      <textarea
        name={name}
        id={id}
        type={type || "text"}
        value={value}
        placeholder={placeholder || "Enter Value Here"}
        onChange={onChange}
        maxLength="50"
        cols="30"
        rows="7"
        className={cn(
          "flex min-h-[140px] max-h-[140px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",

          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
