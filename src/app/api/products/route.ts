import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import {
  CreateProductSchema,
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
  const {
    businessId,
    categoryId,
    description,
    price,
    product_name,
    quantity,
    toBuyId,
    buyerId,
  } = parsedBody.data;

  try {
    await prisma.$transaction([
      prisma.product.create({
        data: {
          description,
          price,
          product_code: `${product_name.slice(0, 3)}-${Math.ceil(Math.random() * 1234)}`,
          product_name,
          quantity,
          businessId: businessId,
          categoryId,
          buyerId,
        },
      }),
      prisma.toBuy.delete({
        where: {
          id: toBuyId,
        },
      }),
    ]);
    return NextResponse.json(
      {
        message: "Product added successfully.",
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
    const products = await prisma.product.findMany({
      where: {
        businessId: businessId,
      },
      include: {
        buyer: {
          select: {
            id: true,
            name: true
          }
        }
      }
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
