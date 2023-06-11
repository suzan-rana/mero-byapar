import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import {
  CreateProductSchema,
  CreateProductType,
  GetProductSchema,
} from "@/common/schema/ProductSchema";
import prismaErrorHandler from "@/common/error";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = CreateProductSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error, {
      status: 400,
    });
  }
  const { businessId, categoryId, ...restItems } = parsedBody.data;
  try {
    await prisma.product.create({
      data: {
        ...restItems,
        businessId: businessId,
        categoryId,
      },
    });
    return NextResponse.json(
      {
        message: "Category created successfully.",
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
  const body = await request.json();
  const parsedBody = GetProductSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error, {
      status: 400,
    });
  }
  try {
    const products = prisma.product.findMany({
      where: {
        businessId: parsedBody.data.businessId,
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
