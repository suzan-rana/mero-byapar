import prismaErrorHandler from "@/common/error";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const businessId = request.nextUrl.searchParams.get("businessId");
  if (!businessId) {
    return NextResponse.json(
      {
        message: "BusinessId is required.",
      },
      {
        status: 400,
      }
    );
  }
  try {
    const products = await prisma.product.findMany({
      where: {
        businessId: businessId,
        quantity: {
          gte: 1
        }
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        product_name: true,
        price: true,
        quantity: true
      },
    });
    return NextResponse.json(
      {
        data: products,
        message: "Products retrieved successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    return prismaErrorHandler(error);
  }
}
