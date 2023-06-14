"use client";
import Table, { TData, TRow } from "@/components/ui/Table";
import { productRows } from "@/utils/constants";
import Link from "next/link";
import React from "react";
import Categories from "./categories";
import PageTitle from "@/components/PageTitle";
import useFetchProducts from "@/common/data-fetching-hooks/products/useFetchProducts";
import Skeleton from "react-loading-skeleton";
import Pagination, { usePagination } from "@/components/ui/Pagination";

type Props = {};

const ProductsPage = (props: Props) => {
  const paginationProps = usePagination();
  const { data, isLoading, isFetching, isError, totalPages } = useFetchProducts(
    paginationProps.currentPage,
    10
  );

  return (
    <main>
      <PageTitle>Available Products</PageTitle>
      <Table
        headingArray={[
          "Index",
          "Name",
          "Code",
          "Quantity",
          "Price",
          "Bought Date",
          "Bought By",
          "Actions",
        ]}
        isError={isError}
        length={data?.length}
        isLoading={isLoading || isFetching}
        renderCustomBody={true}
        customBody={data?.map((row, index) => (
          <TRow key={row.id}>
            <TData>{index + 1}</TData>
            <TData>{row.product_name}</TData>
            <TData className="uppercase">{row.product_code}</TData>

            <TData>{row.quantity}</TData>

            <TData>{row.price}</TData>

            <TData>{new Date(row.created_at).toLocaleDateString()}</TData>

            <TData>{row.buyer.name}</TData>
            <TData className="underline text-green-600">
              <Link href={`/products/${row.id}`} className="block">
                View
              </Link>
            </TData>
          </TRow>
        ))}
      />
      {totalPages && (
        <Pagination {...paginationProps} totalPages={totalPages} />
      )}
      <Categories />
    </main>
  );
};

export default ProductsPage;
