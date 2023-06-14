"use client";
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
  const { data, isLoading, isFetching } = useFetchProductByProductId(
    params.productId
  );
  return (
    <div>
      <Card isLoading={isFetching || isLoading}>
        {data && (
          <>
            <div className="flex justify-between items-start sm:items-center">
              <CardTitle title={data?.product_name} />
              <div className="flex gap-3">
                <CardText
                  text={`${data.product_code}`}
                  className="inline-block border border-green-600 cursor-pointer text-green-700 px-2   rounded-md uppercase"
                ></CardText>
                <CardText
                  text={data.category.category_name}
                  className="bg-green-300 inline-block px-2   rounded-md text-gray-800 lowercase"
                ></CardText>
              </div>
            </div>
            <CardText text={`Price per item: ${data?.price}`} />
            <CardText text={`Quantity: ${data?.quantity}`} />
            <CardText
              text={`Bought at: ${new Date(
                data?.created_at
              ).toLocaleDateString()}`}
            />
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
              <Button variant={"primary"}>
                <Link href={"/products"} className="w-full h-full block">
                  Back
                </Link>
              </Button>
            </ButtonGroup>
          </>
        )}
      </Card>
    </div>
  );
};

export default ProductItemPage;
