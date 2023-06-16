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
    const toBuyItems = await prisma.toBuy.findMany({
      where: {
        businessId,
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        created_at: "desc",
      },
      include: {
        category: {
          select: {
            id: true,
            category_name: true,
          },
        },
      },
    });
    const totalItems = await prisma.toBuy.count({
      where: {
        businessId,
      },
    });
    return NextResponse.json(
      {
        message: "ToBuy retrieved successfully.",
        data: toBuyItems,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    const e = prismaErrorHandler(error, "ToBuy");
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
  const {
    businessId,
    buy_from,
    categoryId,
    deadline_date,
    description,
    product_code,
    product_name,
    product_price,
    quantity,
  } = parsedBody.data;
  const existingToBuyItem = await prisma.toBuy.findFirst({
    where: {
      product_code: parsedBody.data.product_code,
      businessId: parsedBody.data.businessId,
    },
  });
  try {
    await prisma.toBuy.upsert({
      create: {
        businessId,
        buy_from,
        categoryId,
        deadline_date,
        description,
        product_code,
        product_name,
        product_price,
        quantity,
        buyerId: decoded?.id,
      },
      where: {
        id: existingToBuyItem?.id || "",
      },
      update: {
        quantity: +quantity + +existingToBuyItem?.quantity! || 0,
        product_name,
        product_price,
        description,
        deadline_date,
        buy_from,
        categoryId,
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
    const e = prismaErrorHandler(error, "ToBuy item");
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
    const e = prismaErrorHandler(error, "ToBuy item");
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
