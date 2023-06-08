import { cn } from "@/lib/utils";
import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {}

const PageTitle = ({ className, ...restProps }: Props) => {
  return (
    <h1
      className={cn("text-xl sm:text-2xl font-bold", className)}
      {...restProps}
    ></h1>
  );
};

export default PageTitle;
