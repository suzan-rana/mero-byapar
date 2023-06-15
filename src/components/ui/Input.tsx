import { type VariantProps, cva } from "class-variance-authority";
import React, { useState } from "react";
import { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: FieldError;
}

export const inputVariants = cva(
  "ring-offset-background placeholder:text-muted-foreground bg-white  flex h-10 w-full rounded-md border  px-3 py-2 sm:px-4 sm:py-3  text-sm sm:text-base file:border-0 file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed rounded-md border  focus:outline-blue-100 ",
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

export const PasswordInputElement = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ error, ...restProps }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      className={`flex items-center justify-between  rounded-md border bg-white px-3 py-2 text-sm shadow-sm focus:outline-blue-400 md:text-base ${
        error ? "border-[1px] border-red-500 focus:outline-red-500" : ""
      }`}
    >
      <input
        ref={ref}
        className="border-none bg-transparent grow outline-none"
        {...restProps}
        type={showPassword ? "text" : "password"}
      />
      {showPassword ? (
        <IoEyeSharp
          className="h-4 w-4 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setShowPassword((prev) => !prev);
          }}
        />
      ) : (
        <FaEyeSlash
          className="h-4 w-4 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setShowPassword((prev) => !prev);
          }}
        />
      )}
    </div>
  );
});
PasswordInputElement.displayName = "PasswordInputElement";
