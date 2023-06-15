import { cn } from "@/lib/utils";
import React from "react";
import { FieldError } from "react-hook-form";
import InputErrorMessage from "./InputErrorMessage";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  name: string;
  spanClassName?: string;
  error?: FieldError;
}

const Label = ({
  name,
  className,
  spanClassName,
  children,
  error,
  ...restProps
}: LabelProps) => {
  return (
    <label className={cn("flex flex-col gap-2", className)} {...restProps}>
      <span className={cn("text-sm font-semibold sm:text-base", spanClassName)}>
        {name}
      </span>
      {children}
      {error && <InputErrorMessage error={error} />}
    </label>
  );
};

export default Label;
