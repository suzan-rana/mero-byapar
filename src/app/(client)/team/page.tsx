"use client";
import PageTitle from "@/components/PageTitle";
import Table, { TData, TRow } from "@/components/ui/Table";
import { employeesArray } from "@/utils/constants";
import React from "react";
import AddEmployees from "./AddEmployees";
import useFetchUsers from "@/common/data-fetching-hooks/users/useFetchUsers";
import Link from "next/link";
import Pagination, { usePagination } from "@/components/ui/Pagination";

type Props = {};

const EmployeePage = (props: Props) => {
  const paginationProps = usePagination();
  const { data, isLoading, isFetching, isError, totalPages } = useFetchUsers(
    paginationProps.currentPage,
    10
  );
  return (
    <main>
      <PageTitle>Team Members</PageTitle>
      <Table
        isError={isError}
        length={data?.length}
        isLoading={isLoading || isFetching}
        renderCustomBody={true}
        customBody={data?.map((row, index) => (
          <TRow key={row.id}>
            <TData>{index + 1}</TData>
            <TData>{row.name}</TData>
            <TData>{row.email}</TData>

            <TData>{row.contact_number}</TData>

            <TData>{new Date(row.created_at).toLocaleDateString()}</TData>

            <TData>{row.role.role_name}</TData>

            <TData className="underline text-green-600">
              <Link href={`/team/${row.id}`}>View</Link>
            </TData>
          </TRow>
        ))}
        headingArray={[
          "Index",
          "Name",
          "Email",
          "Contact",
          "Joined Date",
          "Position",
          "Actions",
        ]}
      />
      {totalPages && (
        <Pagination {...paginationProps} totalPages={totalPages! || 1} />
      )}
      <AddEmployees />
    </main>
  );
};

export default EmployeePage;
