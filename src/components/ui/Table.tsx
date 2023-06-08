"use client";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  headingArray: Array<string>;
  bodyArray: Array<
    Record<Props["headingArray"][number], string | number | React.ReactNode>
  >;
  renderCustomBody?: boolean;
  customBody?: React.ReactNode;
};

const Table = ({
  headingArray,
  bodyArray,
  renderCustomBody = false,
  customBody,
}: Props) => {
  return (
    <table className="table-auto px-5 overflow-x-auto border-collapse border  bg-gray-200 rounded-md my-8 border-gray-300">
      <thead>
        <tr>
          {headingArray.map((item, index) => (
            <th className="py-5 px-4  font-semibold" key={index}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="mx-5 ">
        {renderCustomBody ? (
          customBody
        ) : (
          <>
            {bodyArray.map((row, idx) => (
              <TRow key={idx}>
                {Object.keys(row).map((col, i) => (
                  <TData key={i}>{row[col]}</TData>
                ))}
              </TRow>
            ))}
          </>
        )}
      </tbody>
    </table>
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
      className={cn("cursor-pointer hover:bg-green-300", className)}
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
      className={cn("py-4  px-2 text-center min-w-[10rem]", className)}
      {...restProps}
    ></td>
  );
};
