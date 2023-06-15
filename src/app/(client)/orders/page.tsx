import PageTitle from "@/components/PageTitle";
import Table, { TData } from "@/components/ui/Table";
import { productRows } from "@/utils/constants";
import Link from "next/link";
import React from "react";
import AddOrder from "./AddOrder";

type Props = {};

const OrdersPage = (props: Props) => {
  
  return (
    <main>
      <PageTitle>Customer Orders</PageTitle>
      <Table
        bodyArray={productRows}
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
        additionalNode={(id?: string) => (
          <TData className="underline text-green-600">
            <Link href={`/product/${id}`}>View</Link>
          </TData>
        )}
      />
      <AddOrder />
    </main>
  );
};

export default OrdersPage;
