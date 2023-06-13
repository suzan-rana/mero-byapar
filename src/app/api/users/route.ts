import { type NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import {
  CreateNewUserSchema,
  CreateNewUserType,
  UpdateUserSchema,
  UpdateUserType,
} from "@/common/schema/UserSchema";
import { encryptPassword } from "@/lib/bcrypt";
import prismaErrorHandler from "@/common/error";
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
      businessId,
    },
    include: {
      role: {
        select: {
          role_name: true,
        },
      },
    },
  });
  console.log("USER", user);
  return NextResponse.json(
    {
      message: "User  retreived successfully.",
      data: user,
    },
    {
      status: 200,
      statusText: "User  retreived successfully.",
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
  try {
    const { role_name, businessId, ...rest } = parsedBody.data;
    await prisma.user.create({
      include: {
        business: true,
        role: true,
      },
      data: {
        ...rest,
        password: await encryptPassword(rest.password),
        business: {
          connect: {
            id: businessId,
          },
        },
        role: {
          connectOrCreate: {
            create: {
              role_name: role_name,
            },
            where: {
              role_name: role_name,
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "User  created successfully.",
      },
      {
        status: 201,
        statusText: "User  created successfully.",
      }
    );
  } catch (error) {
    return prismaErrorHandler(error);
  }
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
