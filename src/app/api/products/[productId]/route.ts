import prismaErrorHandler from "@/common/error";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { productId } = params;
  try {
    const product = await prisma.product.findFirst({
      include: {
        buyer: {
          select: {
            id: true,
            name: true,
            email: true,
            contact_number: true,
            role: {
              select: {
                role_name: true,
              },
            },
          },
        },
        category: {
          select: {
            category_name: true,
            id: true,
          },
        },
      },
      where: {
        id: productId,
      },
    });
    return NextResponse.json({
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    const e = prismaErrorHandler(error, "Product");
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
