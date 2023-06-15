"use client";
import useFetchDashboard from "@/common/data-fetching-hooks/dashboard/useFetchDashboard";
import Card, { CardText, CardTitle } from "@/components/Card";
import { useAuthContext } from "@/context/hooks";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  const { user } = useAuthContext();
  const { data, isFetching, isLoading } = useFetchDashboard();
  return (
    <main>
      <h1 className="text-2xl mt-10 text-green-600 font-bold">Hello, {user?.name}</h1>
      <section className="flex flex-col sm:flex-row gap-10 gap-y-6 flex-wrap">
        <Card className="sm:max-w-[45%]" isLoading={isFetching || isLoading || !data}>
          <CardTitle title={"Products"} />
          <CardText text={`Total products: ${data?.products.total_products}`} />
          <CardText
            text={`Total quantities: ${data?.products.total_quantity}`}
          />
          <CardText text={`Total price: ${data?.products.total_price}`} />
        </Card>
        <Card className="sm:max-w-[45%]" isLoading={isFetching || isLoading || !data}>
          <CardTitle title={"To Buy"} />
          <CardText text={`Total items to buy: ${data?.toBuyItems.total_buying_items}`} />
          <CardText
            text={`Total quantities: ${data?.toBuyItems.total_buying_quantity}`}
          />
          <CardText text={`Total price: ${data?.toBuyItems.total_buying_price}`} />
        </Card>
        <Card className="sm:max-w-[45%]" isLoading={isFetching || isLoading || !data}>
          <CardTitle title={"Sales"} />
          <CardText text={`Total sales: ${data?.sales.total_sales}`} />
          <CardText
            text={`Total quantities: ${data?.sales.total_sold_quantity}`}
          />
          <CardText text={`Total price: ${data?.sales.total_sold_price}`} />
        </Card>
        <Card className="sm:max-w-[45%]" isLoading={isFetching || isLoading || !data}>
          <CardTitle title={"Orders"} />
          <CardText text={`Total orders: ${data?.orders.total_orders}`} />
          <CardText
            text={`Total quantities: ${data?.orders.total_order_quantity}`}
          />
          <CardText text={`Total price: ${data?.orders.total_order_price}`} />
        </Card>
      </section>
    </main>
  );
};

export default Home;
