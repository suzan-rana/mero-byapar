import { type NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import {
  CreateNewUserSchema,
  CreateNewUserType,
  UpdateUserSchema,
  UpdateUserType,
} from "@/common/schema/UserSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const toBeCreatedUser = CreateNewUserSchema.safeParse(body);
  if (!toBeCreatedUser.success) {
    NextResponse.json(toBeCreatedUser);
  }

  // we have email,
  const { contact_number, email, name, positionId, password, businessId } =
    body as CreateNewUserType;
  const user = await prisma.user.create({
    data: {
      roleId: positionId,
      businessId,
      contact_number,
      email,
      name,
      password,
    },
  });
  NextResponse.json(
    {
      message: "User  created successfully.",
      data: user,
    },
    {
      status: 200,
      statusText: "User  created successfully.",
    }
  );
}

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as UpdateUserType;
  const toBeUpdatedUser = UpdateUserSchema.safeParse(body);
  if (!toBeUpdatedUser.success) {
    NextResponse.json(toBeUpdatedUser);
  }
  await prisma.user
    .update({
      data: {
        ...body,
      },
      where: {
        id: body.id,
      },
    })
    .then(() => {
      NextResponse.json(
        {
          message: "User updated successfully.",
        },
        {
          status: 201,
        }
      );
    })
    .catch((error) => {
      NextResponse.json(error?.message, {
        status: 400,
      });
    });
}
