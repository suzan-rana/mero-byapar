import { comparePassword } from "@/lib/bcrypt";
import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as jose from "jose";
import { createToken } from "@/lib/jwt";

const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
type loginUserType = z.infer<typeof LoginUserSchema>;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const toBeLoggedinUser = LoginUserSchema.safeParse(body);
  if (!toBeLoggedinUser.success) {
    NextResponse.json(toBeLoggedinUser);
  }
  const { email, password } = body as loginUserType;
  const userInDatabase = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!userInDatabase) {
    return NextResponse.json(
      {
        message: "User not found.",
      },
      {
        status: 404,
        statusText: "User not found",
      }
    );
  }
  // user exists
  const isPasswordSame = await comparePassword(
    password,
    userInDatabase?.password!
  );
  if (!isPasswordSame) {
    NextResponse.json(
      {
        message: "Invalid credentials",
      },
      {
        status: 401,
        statusText: "Invalid Credentials",
      }
    );
  }
  const token = createToken({
    id: userInDatabase.id,
  });
  NextResponse.json(
    {
      token,
    },
    {
      status: 200,
      statusText: "User logged in successfully.",
    }
  );
}
