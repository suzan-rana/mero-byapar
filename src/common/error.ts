import { NextResponse } from "next/server";

const prismaErrorHandler = (err: any, entity?: string) => {
  if (err.code) {
    // Handle Prisma error instances
    switch (err.code) {
      case "P2002":
        // Unique constraint violation error
        return NextResponse.json(
          {
            message: `${entity} already exists.`,
            erro: err.message,
            statusCode: 400,
          },
          {
            status: 400,
          }
        );
      case "P2025":
        // Record not found error
        return NextResponse.json(
          {
            message: `${entity} not found.`,
            error: err.message,
            statusCode: 404,
          },
          {
            status: 404,
          }
        );
      case "P2016":
        // Invalid JSON value error
        return NextResponse.json(
          {
            message: `Invalid ${entity} value was sent.`,
            error: err.message,
            statusCode: 400,
          },
          {
            status: 400,
          }
        );
      // Add more cases for other commonly occurring Prisma error codes as needed
      default:
        // Handle other Prisma error codes
        return NextResponse.json(
          {
            message: "Internal Server Error",
            error: err.message,
            statusCode: 500,
          },
          {
            status: 500,
          }
        );
    }
  }
};

export default prismaErrorHandler;
