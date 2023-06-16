import prisma from "@/lib/prisma";
import { Order, Prisma, Product, Sale, ToBuy } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const businessId = request.nextUrl.searchParams.get("businessId");

  const products = await prisma.$queryRaw<Product[]>(Prisma.sql`
        SELECT 
        CAST(SUM(price * quantity) as DECIMAL(38)) as total_price, 
        SUM(quantity) as total_quantity, 
        COUNT(id) as total_products 
        FROM Product WHERE businessId=${businessId}
`);
  const toBuyItems = await prisma.$queryRaw<ToBuy[]>(Prisma.sql`
        SELECT 
        SUM(product_price * quantity) as total_buying_price, 
        SUM(quantity) as total_buying_quantity, 
        COUNT(id) as total_buying_items 
        FROM ToBuy WHERE businessId=${businessId};
`);
  const orders = await prisma.$queryRaw<Order[]>(Prisma.sql`
    SELECT 
    SUM(p.price * o.order_quantity) AS total_order_price, 
    SUM(o.order_quantity) AS total_order_quantity, 
    COUNT(o.id) AS total_orders 
    FROM \`Order\` AS o 
    LEFT JOIN Product AS p ON o.productId = p.id 
    WHERE p.businessId = ${businessId};
`);

  const sales = await prisma.$queryRaw<Sale[]>(Prisma.sql`
        SELECT 
        SUM(s.sold_price * s.sold_quantity) AS total_sold_price, 
        SUM(s.sold_quantity) AS total_sold_quantity, 
        COUNT(s.id) AS total_sales
        FROM Sale AS s WHERE s.businessId=${businessId};
`);

  return NextResponse.json(
    {
      products: products[0],
      toBuyItems: toBuyItems[0],
      orders: orders[0],
      sales: sales[0],
    },
    {
      status: 200,
    }
  );
}
// total products, total quantity and total price
// total sales, total sales quantity and total sold price,
// total orders, total orders quantity
// total employees
