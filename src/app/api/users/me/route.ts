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
      business: {
        select: {
          id: true,
          name: true
        }
      },
      email: true,
      name: true,
      contact_number: true,
      role: {
        select: {
          role_name: true,
        },
      },
    },
  });
  if(!user){
    return NextResponse.json({
      message: "User not found",
    });
  }

  return NextResponse.json({
    message: "User found",
    data: user,
  });
}
