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
    });
    return NextResponse.json(
      {
        message: "Order retrieved successfully.",
        data: orders,
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
  try {
    await prisma.order.create({
      data: {
        ...parsedBody.data,
      },
    });
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
export async function DELETE(request: NextRequest) {
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
  const parsedBody = DeleteOrderSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error, {
      status: 400,
    });
  }
  const { id } = parsedBody.data;
  try {
    await prisma.order.delete({
      where: {
        id,
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
    return prismaErrorHandler(error);
  }
}
