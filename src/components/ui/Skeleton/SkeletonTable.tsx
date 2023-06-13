import React from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
    row_count: number;
    column_count: number
};

const SkeletonTable = ({ column_count, row_count}: Props) => {
  return (
    <table className="w-full px-5 mb-10 mt-4">
      <thead>
        <tr>
          {Array(column_count)
            .fill(1)
            .map((i, index) => (
              <th key={index} className="px-3 py-3">
                <Skeleton className="h-[2rem]  max-w-[8rem]" />
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {Array(row_count)
          .fill(1)
          .map((_, index) => (
            <tr key={index}>
              {Array(column_count)
                .fill(1)
                .map((i, index) => (
                  <td key={index} className="text-center py-4 px-2">
                    <Skeleton className="h-[2rem] max-w-[8rem]" />
                  </td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default SkeletonTable;
