import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

const textAreaVariants = cva(
  "ring-offset-background placeholder:text-muted-foreground min-h-[6rem]  w-full rounded-md border  px-3 py-1 sm:px-4 sm:py-2  text-sm sm:text-base file:border-0 file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 rounded-md border  focus:outline-blue-100 ",
);
interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaVariants> {
  error?: FieldError;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, children, ...restProps }, ref) => {
    return (
      <textarea
        className={cn(
          textAreaVariants({ className }),
          error && "border-[1px] border-red-500 focus:outline-red-500"
        )}
        {...restProps}
        ref={ref}
      >
        {children}
      </textarea>
    );
  }
);
TextArea.displayName = "TextArea";
export default TextArea;
