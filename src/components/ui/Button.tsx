import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

export const buttonVariants = cva(
  "rounded-md  border-[1px] text-sm sm:text-base px-4 py-2 sm:px-4 sm:py-3 transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-green-300 text-gray-800 hover:bg-green-400",
        outline: "border-green-500 text-green-500 hover:bg-green-100",
        secondary:
          "bg-black text-white border-white border hover:text-slate-900 hover:bg-slate-200",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2",
        lg: "h-11 px-8",
      },
      defaultVariants: {
        variant: "primary",
        size: "default",
      },
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
const Button = ({
  variant,
  size,
  type,
  className,
  disabled,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      type={type ? type : "button"}
      disabled={disabled}
      className={cn(buttonVariants({ variant, size, className }))}
      {...restProps}
    />
  );
};
export default Button;
