import { cn } from "@/lib/utils";
import React from "react";
import SkeletonTable from "./Skeleton/SkeletonTable";

type Props = {
  headingArray: Array<string>;
  bodyArray?: Array<
    Record<Props["headingArray"][number], string | number | React.ReactNode>
  >;
  renderCustomBody?: boolean;
  customBody?: React.ReactNode;
  additionalNode?: (id?: string) => React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  length?: number;
};

const Table = ({
  headingArray,
  bodyArray,
  renderCustomBody = false,
  customBody,
  additionalNode,
  isLoading = false,
  length,
  isError = false,
}: Props) => {
  if (isLoading) {
    return <SkeletonTable row_count={5} column_count={headingArray.length} />;
  }

  if (isError || !length) {
    return <NoDataFound />;
  }

  return (
    <div className="overflow-x-auto ">
      <table className="w-full px-5 border-collapse border   bg-gray-200 rounded-md mt-8 border-gray-300">
        <thead>
          <tr>
            {headingArray.map((item, index) => (
              <th
                className="py-3 sm:py-5 sm:pb-4  px-3 text-sm sm:text-base font-semibold"
                key={index}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="mx-5 overflow-x-scroll">
          {renderCustomBody ? (
            <>
              {customBody}
              <TRow>
                <TData>&nbsp;</TData>
              </TRow>
            </>
          ) : (
            <>
              {bodyArray?.map((row, idx) => (
                <TRow key={idx}>
                  {Object.keys(row).map((col, i) => (
                    <TData key={i}>{row[col]}</TData>
                  ))}
                  {additionalNode && (
                    <>{additionalNode(row["id"]?.toString() || "1id")}</>
                  )}
                </TRow>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

interface TRowProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {}
export const TRow = ({ className, ...restProps }: TRowProps) => {
  return (
    <tr
      className={cn("cursor-pointer  hover:bg-green-300", className)}
      {...restProps}
    ></tr>
  );
};

interface TDataProps
  extends React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  > {}
export const TData = ({ className, ...restProps }: TDataProps) => {
  return (
    <td
      className={cn(
        "sm:table-cell text-sm sm:text-base py-2 sm:py-3  px-2 text-center min-w-[9rem]",
        className
      )}
      {...restProps}
    ></td>
  );
};

const NoDataFound = () => {
  return (
    <section className="w-full px-5 sm:h-[15rem] flex justify-center items-center border-collapse border  bg-gray-200 rounded-md my-8 border-gray-300">
      <p className="py-3 text-center sm:py-5 text-green-600  px-3 text-sm sm:text-base font-semibold">
        Sorry, no data found, Try reloading...
      </p>
    </section>
  );
};
