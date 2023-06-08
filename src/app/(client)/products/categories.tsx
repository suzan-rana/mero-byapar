import PageSubtitle from "@/components/PageSubtitle";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import { categoryRows } from "@/utils/constants";
import Link from "next/link";
import React from "react";

type Props = {};

const Categories = (props: Props) => {
  return (
    <section>
      <div className="flex items-start justify-between">
        <PageSubtitle>Categories</PageSubtitle>
        <Button variant={'primary'}><Link href={'/products/categories'} className="w-full block h-full">Create <span className="hidden sm:inline">new category</span></Link></Button>
      </div>
      <Table
        headingArray={["Index", "Name", "Code", "Total Products", "Actions"]}
        bodyArray={categoryRows}
      />
    </section>
  );
};

export default Categories;
