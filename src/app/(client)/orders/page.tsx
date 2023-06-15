"use client";
import PageTitle from "@/components/PageTitle";
import Table, { TData, TRow } from "@/components/ui/Table";
import { productRows } from "@/utils/constants";
import Link from "next/link";
import React from "react";
import AddOrder from "./AddOrder";
import useFetchOrders from "@/common/data-fetching-hooks/orders/useFetchOrders";
import Pagination, { usePagination } from "@/components/ui/Pagination";

type Props = {};

const OrdersPage = (props: Props) => {
  const paginationProps = usePagination();
  const {
    data,
    error,
    isError,
    isFetching,
    isLoading,
    totalItems,
    totalPages,
  } = useFetchOrders(paginationProps.currentPage, 10);
  return (
    <main>
      <PageTitle>Customer Orders</PageTitle>
      <Table
        isLoading={isLoading || isFetching || !data}
        length={data?.length}
        renderCustomBody={true}
        customBody={data?.map((order, index) => (
          <TRow key={order.id}>
            <TData>{index + 1}</TData>
            <TData>{order.product.product_name}</TData>
            <TData className="uppercase">{order.product.product_code}</TData>
            <TData>{order.order_quantity}</TData>
            <TData>{order.product.price}</TData>
            <TData>{new Date(order.created_at).toLocaleDateString()}</TData>
            <TData>{order.customer_name}</TData>
            <TData>
              <Link
                className="underline text-green-500"
                href={`/orders/${order.id}`}
              >
                View
              </Link>
            </TData>
          </TRow>
        ))}
        headingArray={[
          "Index",
          "Produtct Name",
          "Code",
          "Quantity",
          "Price",
          "Order Date",
          "Order By",
          "Actions",
        ]}
      />
      {data && totalPages ? (
        <Pagination {...paginationProps} totalPages={totalPages} />
      ) : null}
      <AddOrder />
    </main>
  );
};

export default OrdersPage;
