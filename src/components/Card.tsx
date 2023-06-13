import { TResponseFetchUserByUserId } from "@/common/schema/UserSchema";
import { cn } from "@/lib/utils";
import React from "react";
import SkeletonCard from "./ui/Skeleton/SkeletonCard";

interface CardProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const Card = ({ children, isLoading }: CardProps) => {
  return (
    <article className="border sm:w-[50%] mt-8 px-4 py-4 border-gray-200 rounded-md bg-gray-200 transition-colors  hover:border-green-500">
      {isLoading ? <SkeletonCard /> : children}
    </article>
  );
};

export const CardTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return <h1 className={cn("text-lg font-bold", className)}>{title}</h1>;
};
export const CardText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <p className={cn("text-sm py-2 sm:py-3 sm:text-base", className)}>{text}</p>
  );
};

export const RevealPassword = ({
  password,
  className,
}: {
  password: string;
  className?: string;
}) => {
  return (
    <>
      {" "}
      <article
        className={cn(
          "py-2 px-3 group sm:py-3 cursor-pointer relative inline-block sm:px-3 transition-all  bg-green-100 rounded-lg",
          className
        )}
      >
        {password}
        <div className="invisible absolute cursor-move top-[-2.5rem] right-0 bg-green-300 rounded-lg px-3 py-2 group-hover:visible">
          <span>Password:</span> <span>HelloWorld123@</span>
        </div>
      </article>
      <p className="sm:hidden text-green-800 italic py-2">
        copy text to see password!
      </p>
    </>
  );
};

export default Card;
