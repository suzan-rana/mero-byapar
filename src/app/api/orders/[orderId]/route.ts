import prismaErrorHandler from "@/common/error";
import { validateUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
      select: {
        id: true,
        created_at: true,
        customer_email: true,
        customer_contact_number: true,
        order_quantity: true,
        customer_name: true,
        product: {
          select: {
            product_name: true,
            product_code: true,
            id: true,
            price: true,
            quantity: true,
            category: {
              select: {
                category_name: true,
                category_code: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json({
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    const e = prismaErrorHandler(error, "Order");
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  let decoded;
  try {
    decoded = validateUser(request);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unauthorized",
        error: error,
      },
      {
        status: 401,
      }
    );
  }
  const { orderId } = params;

  try {
    await prisma.order.delete({
      where: {
        id: orderId,
      },
    });
    return NextResponse.json(
      {
        message: "Order deleted successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    const e = prismaErrorHandler(error, "Order");
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
