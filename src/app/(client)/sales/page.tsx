"use client";
import useFetchSales from "@/common/data-fetching-hooks/sales/useFetchSales";
import PageTitle from "@/components/PageTitle";
import Pagination, { usePagination } from "@/components/ui/Pagination";
import Table, { TData, TRow } from "@/components/ui/Table";
import { salesArray } from "@/utils/constants";
import Link from "next/link";
import React from "react";

type Props = {};

const SalesPage = (props: Props) => {
  const paginationProps = usePagination();
  const {
    data,
    error,
    isError,
    isFetching,
    isLoading,
    totalItems,
    totalPages,
  } = useFetchSales(paginationProps.currentPage, 10);
  console.log("DATA", data);
  return (
    <main>
      <PageTitle>Sales</PageTitle>
      <Table
        length={data?.length}
        isError={isError}
        isLoading={isLoading || isFetching}
        renderCustomBody={true}
        customBody={data?.map((sale, index) => (
          <TRow key={sale.id}>
            <TData>{index + 1}</TData>
            <TData>{sale.product.product_name}</TData>
            <TData>{sale.product.product_code}</TData>
            <TData>{sale.soldTo.name}</TData>

            <TData>{sale.sold_quantity}</TData>

            <TData>{sale.sold_price}</TData>

            <TData>{new Date(sale.created_at).toLocaleDateString()}</TData>

            <TData>{sale.seller.name}</TData>

            {/* <TData className="text-green-500 underline">
              <Link href={`/sales/${sale.id}`}>View</Link>
            </TData> */}
          </TRow>
        ))} 
        headingArray={[
          "Index",
          "Product Name",
          "Code",
          "Sold to",
          "Quantity",
          "Price",
          "Sold Date",
          "Sold By",
          // "Actions",
        ]}
      />
      {data && totalPages ? (
        <Pagination {...paginationProps} totalPages={totalPages} />
      ) : null}
    </main>
  );
};

export default SalesPage;
