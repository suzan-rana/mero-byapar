import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";
import { FieldError } from "react-hook-form";

export const selectVariants = cva(
  "ring-offset-background placeholder:text-muted-foreground  flex h-10 w-full rounded-md border  px-3 py-2 sm:px-4 sm:py-1  text-sm sm:text-base file:border-0 file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 rounded-md border  focus:outline-blue-100 ",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
      },
    },
  }
);
interface Props
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  error?: FieldError;
}

const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ error, className, ...restProps }, ref) => {
    return (
      <select
        className={cn(
          selectVariants({ className }),
          error && "border-[1px] border-red-500 focus:outline-red-500"
        )}
        ref={ref}
        {...restProps}
      />
    );
  }
);
Select.displayName = "Select";
export default Select;
