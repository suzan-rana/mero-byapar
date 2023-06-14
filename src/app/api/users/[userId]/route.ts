import prismaErrorHandler from "@/common/error";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        business: {
          select: {
            id: true,
            name: true,
          },
        },
        email: true,
        name: true,
        contact_number: true,
        oneTimePassword: true,
        password: true,
        role: {
          select: {
            id: true,
            role_name: true,
          },
        },
      },
    });
    return NextResponse.json({
      message: "User found",
      data: {
        ...user,
        // decodedPassword: 
      },
    });
  } catch (error) {
    return prismaErrorHandler(error);
  }
}
