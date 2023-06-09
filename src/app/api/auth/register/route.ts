import { type NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { z } from "zod";
import { encryptPassword } from "@/lib/bcrypt";

const CreateRootUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
  contact_number: z.number().min(10),
  business: z.object({
    name: z.string(),
    email: z.string().email(),
    contact_number: z.number().min(10),
    description: z.string(),
  }),
});
type CreateUserType = z.infer<typeof CreateRootUserSchema>;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const toBeCreatedUser = CreateRootUserSchema.safeParse(body);
  if (!toBeCreatedUser.success) {
    NextResponse.json(toBeCreatedUser);
  }

  // we have email,
  let { contact_number, email, name, password, business } =
    body as CreateUserType;
  password = await encryptPassword(password);
  const user = await prisma.user.create({
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
      contact_number,
      email,
      name,
      password,
    },
  });
  NextResponse.json(
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
