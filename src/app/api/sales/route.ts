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
  const { orderId, soldTo, productId, sold_quantity, ...restItems } =
    parsedBody.data;
  const selectedProduct = await prisma.product.findFirst({
    where: {
      id: productId,
    },
  });
  if (!selectedProduct) {
    await prisma.order.delete({
      where: {
        id: orderId,
      },
    });
    return NextResponse.json(
      {
        message: "No product found",
      },
      {
        status: 404,
      }
    );
  }

  if (sold_quantity > selectedProduct.quantity) {
    return NextResponse.json(
      {
        message: "Not enough products found on stock",
      },
      {
        status: 400,
      }
    );
  }

  try {
    // case for qty less than actual qty at stock (favorable case)
    if (+sold_quantity < +selectedProduct.quantity) {
      await prisma.$transaction([
        prisma.product.update({
          where: {
            id: productId,
          },
          data: {
            quantity: +selectedProduct.quantity - +sold_quantity,
          },
        }),
        prisma.order.delete({
          where: {
            id: orderId,
          },
        }),
        prisma.sale.create({
          data: {
            ...restItems,
            sold_quantity,
            productId,
            soldTo: {
              create: {
                ...soldTo,
              },
            },
          },
        }),
      ]);
    }

    if (sold_quantity === selectedProduct.quantity) {
      await prisma.$transaction([
        prisma.product.update({
          where: {
            id: productId,
          },
          data: {
            quantity: 0,
          },
        }),
        prisma.sale.create({
          data: {
            ...restItems,
            sold_quantity,
            productId,
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
    }
    return NextResponse.json(
      {
        message: "Sales added successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    const e = prismaErrorHandler(error, "Sales");
    return NextResponse.json(
      {
        ...e,
      },
      {
        status: e?.statusCode,
      }
    );
  }
}
export async function GET(request: NextRequest) {
  const businessId = request.nextUrl.searchParams.get("businessId");
  const page = +request.nextUrl.searchParams.get("page")! || 1;
  const limit = +request.nextUrl.searchParams.get("limit")! || 10;
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
    const sales = await prisma.sale.findMany({
      where: {
        businessId: businessId,
      },
      select: {
        id: true,
        seller: {
          select: {
            name: true,
          },
        },
        soldTo: {
          select: {
            name: true,
          },
        },
        created_at: true,
        sold_price: true,
        sold_quantity: true,
        product: {
          select: {
            product_name: true,
            id: true,
            product_code: true,
            price: true,
            quantity: true,
          },
        },
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        created_at: "desc",
      },
    });
    const totalItems = await prisma.sale.count({
      where: {
        businessId,
      },
    });
    return NextResponse.json(
      {
        data: sales,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
        message: "Sales retrieved successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    const e = prismaErrorHandler(error, "Sales");
    return NextResponse.json(
      {
        ...e,
      },
      {
        status: e?.statusCode,
      }
    );
  }
}
