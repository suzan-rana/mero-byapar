"use client";
import useDeleteOrderById from "@/common/data-fetching-hooks/orders/useDeleteOrderItem";
import useFetchOrderByOrderId from "@/common/data-fetching-hooks/orders/useFetchOrderItem";
import useFetchProductByProductId from "@/common/data-fetching-hooks/products/useFetchProductItem";
import Card, { CardText, CardTitle } from "@/components/Card";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const ProductItemPage = (props: Props) => {
  const params = useParams();
  const { data, isLoading, isFetching } = useFetchOrderByOrderId(
    params.orderId
  );
  const { handleDelete, isLoading: isDeleting } = useDeleteOrderById(
    params.orderId
  );
  return (
    <div>
      <Card isLoading={isFetching || isLoading}>
        {data && (
          <>
            <div className="flex justify-between items-start sm:items-center">
              <CardTitle title={data?.customer_name} />
              {/* <div className="flex gap-3">
                <CardText
                  text={`${data.customer_email}`}
                  className="inline-block border border-green-600 cursor-pointer text-green-700 px-2   rounded-md uppercase"
                ></CardText>
                <CardText
                  text={data.category.category_name}
                  className="bg-green-300 inline-block px-2   rounded-md text-gray-800 lowercase"
                ></CardText>
              </div> */}
            </div>
            <CardText text={`Customer Email: ${data?.customer_email}`} />
            <CardText text={`Contact: ${data?.customer_contact_number}`} />
            <CardText
              text={`Ordered at: ${new Date(
                data?.created_at
              ).toLocaleDateString()}`}
            />
            <section className="my-4 px-4 py-3 border bg-green-300 rounded-lg">
              <h2 className="mb-2 underline italic">About Product:</h2>
              <CardText
                text={`Name: ${data?.product.product_name}`}
                className="sm:py-1 text-green-900 italic"
              />
              <CardText
                text={`Code: ${data?.product.product_code}`}
                className="sm:py-1 text-green-900 italic uppercase"
              />
              <CardText
                text={`Category: ${data?.product.category.category_name}`}
                className="sm:py-1 text-green-900 italic"
              />
              <CardText
                text={`Price per item: ${data?.product.price}`}
                className="sm:py-1 text-green-900 italic"
              />
              <CardText
                text={`Ordered Quantity: ${data?.order_quantity}`}
                className="sm:py-1 text-green-900 italic"
              />
              <CardText
                text={`Stock Quantity: ${data?.product.quantity}`}
                className="sm:py-1 text-green-900 italic"
              />
              <CardText
                text={`Total price: ${
                  +data?.order_quantity * +data.product.price
                }`}
                className="sm:py-1 text-green-900 italic"
              />
            </section>
            <ButtonGroup className="flex-row w-[100%]  mt-6 gap-6 ">
              <Button variant={"primary"}>
                <Link href={"/products"} className="w-full h-full block">
                  Back
                </Link>
              </Button>
            </ButtonGroup>
          </>
        )}
      </Card>
      <Card
        className=" hover:border-red-500"
        isLoading={isDeleting || isFetching || isLoading}
      >
        <CardTitle className="text-red-500" title={"Delete this order"} />
        <CardText
          className="text-red-600"
          text={`Deleting this item will mean you will never gain the access back.`}
        />
        <ButtonGroup className="flex-row w-[100%]  mt-6 gap-6 ">
          <Button
            variant={"primary"}
            onClick={handleDelete}
            className="grow bg-red-400 text-white hover:bg-red-300"
          >
            Delete
          </Button>
        </ButtonGroup>
      </Card>
    </div>
  );
};

export default ProductItemPage;
