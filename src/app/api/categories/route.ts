import prismaErrorHandler from "@/common/error";
import {
  CreateCategorySchema,
  DeleteCategorySchema,
  EditCategorySchema,
} from "@/common/schema/CategorySchema";
import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

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
  // starts from here.
  try {
    const categories = await prisma.category.findMany({
      where: {
        businessId: businessId,
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
    return NextResponse.json(
      {
        data: categories,
        message: "Categories retrieved successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    return prismaErrorHandler(error, 'Categories');
  }
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = CreateCategorySchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error, {
      status: 400,
    });
  }

  // starts from here.
  try {
    await prisma.category.create({
      data: {
        category_code: parsedBody.data.category_code,
        category_name: parsedBody.data.category_name,
        businessId: parsedBody.data.businessId,
      },
    });
    return NextResponse.json(
      {
        message: "Category created successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return prismaErrorHandler(error, 'Categories');
  }
}
export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const parsedBody = DeleteCategorySchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error, {
      status: 400,
    });
  }
  // starts from here.
  //   1. check if some product exists for the category

  const productsFromCategory = await prisma.product.findFirst({
    where: {
      categoryId: parsedBody.data.categoryId,
    },
  });
  if (productsFromCategory) {
    return NextResponse.json(
      {
        message: "Category has products, thus it cannot be deleted for now.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    await prisma.category.delete({
      where: {
        id: parsedBody.data.categoryId,
      },
    });
    return NextResponse.json(
      {
        message: "Category created successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return prismaErrorHandler(error, 'Categories');
  }
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const parsedBody = EditCategorySchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error, {
      status: 400,
    });
  }
  try {
    await prisma.category.update({
      data: {
        ...parsedBody.data,
      },
      where: {
        category_code: parsedBody.data.category_code,
      },
    });
    return NextResponse.json(
      {
        message: "Category updated successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return prismaErrorHandler(error, 'Categories');
  }
}
