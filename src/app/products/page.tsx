import Table from "@/components/ui/Table";
import React from "react";

type Props = {};

const ProductsPage = (props: Props) => {
  return (
    <main>
      <h1 className="text-xl sm:text-2xl font-bold">Available Products</h1>
      <Table
        bodyArray={tableRows}
        headingArray={[
          "Index",
          "Name",
          "Code",
          "Quantity",
          "Price",
          "Bought Date",
          "Bought By",
        ]}
      />
    </main>
  );
};

export default ProductsPage;

const tableRows = [
  {
    Index: 1,
    Name: "Product 1",
    Code: "ABC123",
    Quantity: 10,
    Price: 20.99,
    "Bought Date": "2023-05-15",
    "Bought By": "John",
  },
  {
    Index: 2,
    Name: "Product 2",
    Code: "DEF456",
    Quantity: 5,
    Price: 10.99,
    "Bought Date": "2023-05-18",
    "Bought By": "Jane",
  },
  {
    Index: 3,
    Name: "Product 3",
    Code: "GHI789",
    Quantity: 8,
    Price: 15.99,
    "Bought Date": "2023-05-20",
    "Bought By": "Sarah",
  },
  {
    Index: 4,
    Name: "Product 4",
    Code: "JKL012",
    Quantity: 2,
    Price: 5.99,
    "Bought Date": "2023-05-22",
    "Bought By": "Michael",
  },
  {
    Index: 5,
    Name: "Product 5",
    Code: "MNO345",
    Quantity: 15,
    Price: 25.99,
    "Bought Date": "2023-05-25",
    "Bought By": "David",
  },
];
