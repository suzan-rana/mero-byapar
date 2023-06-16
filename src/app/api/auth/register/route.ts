import { type NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { encryptPassword } from "@/lib/bcrypt";
import {
  CreateRootUserSchema,
  CreateRootUserType,
} from "@/common/schema/UserSchema";
import prismaErrorHandler from "@/common/error";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const toBeCreatedUser = CreateRootUserSchema.safeParse(body);
  if (!toBeCreatedUser.success) {
    return NextResponse.json(toBeCreatedUser.error);
  }

  // we have email,
  let { contact_number, email, name, password, business } =
    toBeCreatedUser.data;
  try {
    await prisma.user.create({
      data: {
        role: {
          connectOrCreate: {
            where: {
              role_name: "ADMIN",
            },
            create: {
              role_name: "ADMIN",
            },
          },
        },
        business: {
          connectOrCreate: {
            create: {
              email: business.email,
              name: business.name,
              contact_number: business.contact_number,
              description: business.description,
            },
            where: {
              email: business.email,
            },
          },
        },
        contact_number: contact_number,
        email,
        name,
        password: await encryptPassword(password),
      },
    });
    return NextResponse.json(
      {
        message: "User and business created successfully.",
      },
      {
        status: 200,
        statusText: "User and business created successfully.",
      }
    );
  } catch (error) {
    const e = prismaErrorHandler(error, "User");
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
