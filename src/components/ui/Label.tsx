import { cn } from "@/lib/utils";
import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  name: string;
  spanClassName?: string;
}

const Label = ({ name, className, spanClassName, children, ...restProps }: LabelProps) => {
  return (
    <label className={cn("flex flex-col gap-2", className)} {...restProps}>
      <span className={cn("text-sm font-semibold sm:text-base", spanClassName)}>{name}</span>
      {children}
    </label>
  );
};

export default Label;
