import prismaErrorHandler from "@/common/error";
import { validateUser } from "@/lib/auth";
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
export async function DELETE(
  request: NextRequest,
  { params }: { params: { toBuyId: string } }
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
  try {
    const { toBuyId } = params;
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
