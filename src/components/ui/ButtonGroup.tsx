import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const ButtonGroup = ({ style, className, children }: Props) => {
  return (
    <div className={cn("flex flex-col gap-4 my-3", className)} style={style}>
      {children}
    </div>
  );
};

export default ButtonGroup;
