import PageTitle from "@/components/PageTitle";
import Table, { TData } from "@/components/ui/Table";
import { toBuyItemArray } from "@/utils/constants";
import Link from "next/link";
import React from "react";
import AddBuyingItem from "./AddBuyingItem";

type Props = {};

const ToBuyPage = (props: Props) => { 
  return (
    <main>
      <PageTitle>Products to Buy</PageTitle>
      <Table
        bodyArray={toBuyItemArray}
        headingArray={[
          "Index",
          "Name",
          "Category",
          "Min quantity",
          "Deadline to buy",
          "Actions",
        ]}
      />
      <AddBuyingItem />
    </main>
  );
};

export default ToBuyPage;
