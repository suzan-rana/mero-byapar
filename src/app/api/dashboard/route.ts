import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const businessId = request.nextUrl.searchParams.get("businessId");

  const products = await prisma.$queryRaw(Prisma.sql`
  SELECT 
    CAST(SUM(price * quantity) as DECIMAL(38)) as total_price, 
    SUM(quantity) as total_quantity, 
    COUNT(id) as total_products 
  FROM Product
`);
  return NextResponse.json(
    {
      products,
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
