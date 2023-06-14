import React from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
  count?: number;
};

const SkeletonCard = ({ count = 5 }: Props) => {
  return (
    <article>
      {Array(count)
        .fill(1)
        .map((i, j) => (
          <Skeleton key={j} className="h-[2rem]  w-full my-3" />
        ))}
    </article>
  );
};

export default SkeletonCard;
