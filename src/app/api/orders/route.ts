import prismaErrorHandler from "@/common/error";
import {
  CreateOrderSchema,
  DeleteOrderSchema,
  UpdateOrderSchema,
} from "@/common/schema/OrderSchema";
import { validateUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

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
    const orders = await prisma.order.findMany({
      where: {
        businessId,
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        created_at: "desc",
      },
      include: {
        product: {
          select: {
            id: true,
            product_name: true,
            price: true,
            product_code: true,
          },
        },
      },
    });
    const totalItems = await prisma.product.count({
      where: {
        businessId,
      },
    });
    return NextResponse.json(
      {
        message: "Order retrieved successfully.",
        data: orders,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return prismaErrorHandler(error);
  }
}

export async function POST(request: NextRequest) {
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
  const body = await request.json();
  const parsedBody = CreateOrderSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error, {
      status: 400,
    });
  }
  const {
    businessId,
    customer_contact_number,
    customer_email,
    customer_name,
    productId,
    quantity,
  } = parsedBody.data;

  try {
    const selectedProduct = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });
    if (Number(selectedProduct?.quantity) < quantity) {
      return NextResponse.json(
        {
          message: "Not enough products",
        },
        {
          status: 400,
        }
      );
    }
    await prisma.order.create({
      data: {
        customer_contact_number,
        customer_email,
        customer_name,
        businessId,
        productId,
        order_quantity: quantity,
      },
    });
    console.log('ORDERED...')
    return NextResponse.json(
      {
        message: "Order created successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return prismaErrorHandler(error);
  }
}
export async function PATCH(request: NextRequest) {
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
  const body = await request.json();
  const parsedBody = UpdateOrderSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error, {
      status: 400,
    });
  }
  const { id, ...restItems } = parsedBody.data;
  try {
    await prisma.order.update({
      data: {
        ...restItems,
      },
      where: {
        id,
      },
    });
    return NextResponse.json(
      {
        message: "Order updated successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return prismaErrorHandler(error);
  }
}
