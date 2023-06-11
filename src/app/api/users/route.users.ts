import { type NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import {
  CreateNewUserSchema,
  CreateNewUserType,
  UpdateUserSchema,
  UpdateUserType,
} from "@/common/schema/UserSchema";
import { encryptPassword } from "@/lib/bcrypt";
export async function GET(request: NextRequest) {
  const businessId = request.nextUrl.searchParams.get("businessId");
  if (!businessId) {
    return NextResponse.json(
      {
        message: "BusinessId is required.",
      },
      {
        status: 400,
      }
    );
  }

  const user = await prisma.user.findMany({
    where: {
      id: businessId,
    },
  });
  return NextResponse.json(
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

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = CreateNewUserSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody, {
      status: 400,
    });
  }

  // we have email,
  const { contact_number, email, name, roleId, password, businessId } =
    parsedBody.data;
  const user = await prisma.user.create({
    data: {
      roleId,
      businessId,
      contact_number,
      email,
      name,
      password: await encryptPassword(password),
    },
  });
  return NextResponse.json(
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
  const parsedBody = UpdateUserSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody, {
      status: 400,
    });
  }
  return await prisma.user
    .update({
      data: {
        ...parsedBody.data,
      },
      where: {
        id: body.id,
      },
    })
    .then(() => {
      return NextResponse.json(
        {
          message: "User updated successfully.",
        },
        {
          status: 201,
        }
      );
    })
    .catch((error) => {
      return NextResponse.json(error?.message, {
        status: 400,
      });
    });
}
