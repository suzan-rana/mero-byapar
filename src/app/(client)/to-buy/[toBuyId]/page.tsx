"use client";
import { useCreateProduct } from "@/common/data-fetching-hooks/products/useCreateProduct";
import useFetchToBuyByToBuyId from "@/common/data-fetching-hooks/to-buy/useFetchToBuyByToBuyId";
import Card, { CardText, CardTitle } from "@/components/Card";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const ToBuyItemPage = (props: Props) => {
  const params = useParams();
  const { data, isLoading, isFetching, productDetails } =
    useFetchToBuyByToBuyId(params.toBuyId);
  const { handleMarkAsBought } = useCreateProduct(productDetails!);
  if (!data) {
    return <></>;
  }
  return (
    <div>
      <Card isLoading={isFetching || isLoading}>
        <div className="flex justify-between items-start sm:items-center">
          <CardTitle title={data?.product_name} />
          <CardText
            text={data.category.category_name}
            className="bg-green-300 inline-block px-2   rounded-md text-gray-800 lowercase"
          ></CardText>
        </div>
        <CardText text={`Price per item: ${data?.product_price}`} />
        <CardText text={`Quantity: ${data?.quantity}`} />
        <CardText text={`Buying from: ${data?.buy_from}`} />
        <CardText text={data.description} />

        <section className="my-4 px-4 py-3 border bg-green-300 rounded-lg">
          <h2 className="mb-2 underline italic">
            Team member responsible for buying:
          </h2>
          <CardText
            text={`Name: ${data?.buyer.name}`}
            className="sm:py-1 text-green-900 italic"
          />
          <CardText
            text={`Email: ${data?.buyer.email}`}
            className="sm:py-1 text-green-900 italic"
          />
          <CardText
            text={`Role: ${data?.buyer.role.role_name}`}
            className="sm:py-1 text-green-900 italic"
          />
          <CardText
            text={`Contact: ${data?.buyer.contact_number}`}
            className="sm:py-1 text-green-900 italic"
          />
        </section>
        <ButtonGroup className="flex-row w-[100%]  mt-6 gap-6 ">
          <Button variant={"outline"} className="grow">
            <Link href={"/to-buy"} className="w-full h-full block">
              Back
            </Link>
          </Button>
          <Button
            onClick={handleMarkAsBought}
            variant={"primary"}
            className="grow"
          >
            Mark as bought
          </Button>
        </ButtonGroup>
      </Card>
    </div>
  );
};

export default ToBuyItemPage;
