import { cn } from "@/lib/utils";
import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {}

const PageSubtitle = ({ className, ...restProps }: Props) => {
  return (
    <h2
      className={cn("text-xl sm:text-2xl font-semibold", className)}
      {...restProps}
    ></h2>
  );
};

export default PageSubtitle;
