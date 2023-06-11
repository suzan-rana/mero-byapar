import { type NextRequest, NextResponse } from "next/server";
import { validateUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
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
  const user = await prisma.user.findFirst({
    where: {
      id: decoded.id,
    },
    select: {
       id: true,
       business: true,
       businessId: true,
       email: true,
       name: true,
       contact_number: true,
       role: true ,
    }
  });

  return NextResponse.json({
    message: "User found",
    data: user
  });
}
