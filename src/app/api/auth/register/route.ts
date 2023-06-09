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
    body as CreateRootUserType;
  password = await encryptPassword(password);
  const user = await prisma.user
    .create({
      data: {
        position: {
          connectOrCreate: {
            where: {
              position_name: "ADMIN",
            },
            create: {
              position_name: "ADMIN",
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
        password,
      },
    })
    .catch((error) => {
      prismaErrorHandler(error);
    });
  return NextResponse.json(
    {
      message: "User and business created successfully.",
      data: user,
    },
    {
      status: 200,
      statusText: "User and business created successfully.",
    }
  );
}