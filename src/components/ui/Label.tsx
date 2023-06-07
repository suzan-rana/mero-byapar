import { cn } from "@/lib/utils";
import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  name: string;
}

const Label = ({ name, className, children, ...restProps }: LabelProps) => {
  return (
    <label className={cn("flex flex-col gap-2", className)} {...restProps}>
      <span className="text-sm font-semibold sm:text-base">{name}</span>
      {children}
    </label>
  );
};

export default Label;
