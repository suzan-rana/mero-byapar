import prismaErrorHandler from "@/common/error";
import {
  CreateToBuySchema,
  DeleteToBuySchema,
  UpdateToBuySchema,
} from "@/common/schema/ToBuySchema";
import { validateUser } from "@/lib/auth";
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
    const toBuyItems = await prisma.toBuy.findMany({
      where: {
        businessId,
      },
    });
    return NextResponse.json(
      {
        message: "ToBuy retrieved successfully.",
        data: toBuyItems,
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
  const parsedBody = CreateToBuySchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error, {
      status: 400,
    });
  }
  try {
    await prisma.toBuy.create({
      data: {
        ...parsedBody.data,
        buyerId: decoded?.id,
      },
    });
    return NextResponse.json(
      {
        message: "ToBuy created successfully.",
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
  const parsedBody = UpdateToBuySchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error, {
      status: 400,
    });
  }
  const { toBuyId, ...restItems } = parsedBody.data;
  try {
    await prisma.toBuy.update({
      data: {
        ...restItems,
      },
      where: {
        id: toBuyId,
      },
    });
    return NextResponse.json(
      {
        message: "ToBuy updated successfully.",
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
  const parsedBody = DeleteToBuySchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error, {
      status: 400,
    });
  }
  const { toBuyId } = parsedBody.data;
  try {
    await prisma.toBuy.delete({
      where: {
        id: toBuyId,
      },
    });
    return NextResponse.json(
      {
        message: "ToBuy deleted successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return prismaErrorHandler(error);
  }
}
