import prismaErrorHandler from "@/common/error";
import { ResetPasswordSchema } from "@/common/schema/UserSchema";
import { comparePassword, encryptPassword } from "@/lib/bcrypt";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const body = await request.json();
  const parsedBody = ResetPasswordSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error, {
      status: 400,
    });
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        password: true,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found.",
        },
        { status: 404 }
      );
    }
    const isPasswordSame = await comparePassword(
      parsedBody.data.old_password,
      user?.password!
    );
    if (!isPasswordSame) {
      return NextResponse.json(
        {
          message: "Invalid credentials, Please type correct old password.",
        },
        { status: 401 }
      );
    }
    // update password
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await encryptPassword(parsedBody.data.new_password),
      },
    });

    return NextResponse.json(
      {
        message: "Password changed successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    const e = prismaErrorHandler(error, "Password");
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
