import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import {
  CreateProductSchema,
  CreateProductType,
} from "@/common/schema/ProductSchema";
import prismaErrorHandler from "@/common/error";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as CreateProductType;
  const toBeCreatedProduct = CreateProductSchema.safeParse(body);
  if (!toBeCreatedProduct.success) {
    return NextResponse.json(toBeCreatedProduct.error, {
      status: 400,
    });
  }
  const createProduct = await prisma.product
    .create({
      data: {
        ...body,
      },
    })
    .catch((error) => {
      prismaErrorHandler(error);
    });

  return NextResponse.json(
    {
      message: "Product added successfully.",
    },
    {
      status: 200,
    }
  );
}
