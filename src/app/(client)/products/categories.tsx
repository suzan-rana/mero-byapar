"use client";
import useFetchCategories from "@/common/data-fetching-hooks/categories/useFetchCategories";
import PageSubtitle from "@/components/PageSubtitle";
import Button from "@/components/ui/Button";
import Table, { TData, TRow } from "@/components/ui/Table";
import Link from "next/link";
import React from "react";

type Props = {};

const Categories = (props: Props) => {
  const { data, isFetching, isLoading, isError } = useFetchCategories();

  return (
    <section>
      <div className="flex items-start justify-between">
        <PageSubtitle>Categories</PageSubtitle>
        <Button variant={"primary"}>
          <Link href={"/products/categories"} className="w-full block h-full">
            Create <span className="hidden sm:inline">new category</span>
          </Link>
        </Button>
      </div>
      <Table
        isError={isError}
        length={data?.length}
        headingArray={["Index", "Name", "Code", "Total Products"]}
        isLoading={isLoading || isFetching}
        renderCustomBody={true}
        customBody={data?.map((row, i) => (
          <TRow key={row.id}>
            <TData>{i + 1}</TData>
            <TData>{row.category_name}</TData>
            <TData>{row.category_code}</TData>
            <TData>{row._count.products || 0}</TData>
          </TRow>
        ))}
      />
    </section>
  );
};

export default Categories;
