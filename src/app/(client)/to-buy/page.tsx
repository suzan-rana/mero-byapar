"use client";
import PageTitle from "@/components/PageTitle";
import Table, { TData, TRow } from "@/components/ui/Table";
import { toBuyItemArray } from "@/utils/constants";
import React from "react";
import AddBuyingItem from "./AddBuyingItem";
import useFetchToBuy from "@/common/data-fetching-hooks/to-buy/useFetchToBuy";
import Link from "next/link";
import Pagination, { usePagination } from "@/components/ui/Pagination";

type Props = {};

const ToBuyPage = (props: Props) => {
  const paginationProps = usePagination();
  const { data, isLoading, isFetching, isError, totalItems, totalPages } =
    useFetchToBuy(paginationProps.currentPage, 10);

  
  return (
    <main>
      <PageTitle>Products to Buy</PageTitle>
      <Table
        length={data?.length}
        isError={isError}
        isLoading={isLoading || isFetching}
        customBody={data?.map((row, idx) => (
          <TRow key={row.id}>
            <TData>{idx + 1}</TData>
            <TData>{row.product_name}</TData>

            <TData>{row.category.category_name}</TData>

            <TData>{row.quantity}</TData>

            <TData>{row.buy_from}</TData>
            <TData>{row.deadline_date.toLocaleDateString()}</TData>

            <TData className="underline text-green-600">
              <Link href={`/to-buy/${row.id}`}>View</Link>
            </TData>
          </TRow>
        ))}
        renderCustomBody={true}
        headingArray={[
          "Index",
          "Name",
          "Category",
          "Min quantity",
          "Buy from",
          "Deadline to buy",
          "Actions",
        ]}
      />
      {(data && totalItems && totalPages) ? (
        <Pagination {...paginationProps} totalPages={totalPages} />
      ): null}
      <AddBuyingItem />
    </main>
  );
};

export default ToBuyPage;
