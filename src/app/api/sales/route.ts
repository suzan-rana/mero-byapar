import prismaErrorHandler from "@/common/error";
import { CreateSalesSchema } from "@/common/schema/SaleSchema";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = CreateSalesSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error, {
      status: 400,
    });
  }
  const { orderId, soldTo, ...restItems } = parsedBody.data;
  try {
    await prisma.$transaction([
      prisma.sale.create({
        data: {
          ...restItems,
          soldTo: {
            create: {
              ...soldTo,
            },
          },
        },
      }),
      prisma.order.delete({
        where: {
          id: orderId,
        },
      }),
    ]);
    return NextResponse.json(
      {
        message: "Sales added successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return prismaErrorHandler(error);
  }
}
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
    const sales = prisma.product.findMany({
      where: {
        businessId: businessId,
      },
    });
    return NextResponse.json(
      {
        data: sales,
        message: "Sales retrieved successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    return prismaErrorHandler(error);
  }
}
