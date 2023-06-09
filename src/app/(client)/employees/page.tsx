import PageTitle from "@/components/PageTitle";
import Table from "@/components/ui/Table";
import { employeesArray } from "@/utils/constants";
import React from "react";
import AddEmployees from "./AddEmployees";

type Props = {};

const EmployeePage = (props: Props) => {
  return (
    <main>
      <PageTitle>Available Products</PageTitle>
      <Table
        bodyArray={employeesArray}
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
      <AddEmployees />
    </main>
  );
};

export default EmployeePage;
