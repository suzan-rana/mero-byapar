import prismaErrorHandler from "@/common/error";
import {
  UpdateProfileSchema,
} from "@/common/schema/UserSchema";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const body = await request.json();
  const parsedBody = UpdateProfileSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error, {
      status: 400,
    });
  }
  try {
    // update password
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: parsedBody.data.name,
        contact_number: parsedBody.data.contact_number,
      },
    });

    return NextResponse.json(
      {
        message: "Profile updated successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return prismaErrorHandler(error);
  }
}
