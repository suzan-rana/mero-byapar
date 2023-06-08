import Table, { TData } from "@/components/ui/Table";
import { productRows } from "@/utils/constants";
import Link from "next/link";
import React from "react";
import Categories from "./categories";
import PageTitle from "@/components/PageTitle";

type Props = {};

const ProductsPage = (props: Props) => {
  return (
    <main>
      <PageTitle>Available Products</PageTitle>
      <Table
        bodyArray={productRows}
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
        additionalNode={(id?: string) => (
          <TData className="underline text-green-600">
            <Link href={`/product/${id}`}>View</Link>
          </TData>
        )}
      />
      <Categories />
    </main>
  );
};

export default ProductsPage;


