import prismaErrorHandler from "@/common/error";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { toBuyId: string } }
) {
  const { toBuyId } = params;
  try {
    const toBuyItem = await prisma.toBuy.findFirst({
      where: {
        id: toBuyId,
      },
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
            category_code: true,
          },
        },
      },
    });
    return NextResponse.json({
      message: "ToBuy Item found",
      data: toBuyItem,
    });
  } catch (error) {
    return prismaErrorHandler(error);
  }
}
