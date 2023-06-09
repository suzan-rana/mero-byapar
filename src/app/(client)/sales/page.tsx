import PageTitle from "@/components/PageTitle";
import Table from "@/components/ui/Table";
import { salesArray } from "@/utils/constants";
import React from "react";

type Props = {};

const SalesPage = (props: Props) => {
  return (
    <main>
      <PageTitle>Sales</PageTitle>
      <Table
        bodyArray={salesArray}
        headingArray={[
          "Index",
          "Product Name",
          "Code",
          "Quantity",
          "Cost Price",
          "Sold Price",
          "Sold Date",
          "Sold By",
          "Actions",
        ]}
      />
    </main>
  );
};

export default SalesPage;
