import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: FieldError;
}

export const inputVariants = cva(
  "ring-offset-background placeholder:text-muted-foreground  flex h-10 w-full rounded-md border  px-3 py-2 sm:px-4 sm:py-3  text-sm sm:text-base file:border-0 file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 rounded-md border  focus:outline-blue-100 ",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
      },
    },
  }
);
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, error, className, ...restProps }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({ className }),
          error && "border-[1px] border-red-500 focus:outline-red-500"
        )}
        ref={ref}
        {...restProps}
      />
    );
  }
);
Input.displayName = "Input";
export default Input;
