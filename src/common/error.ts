import { NextResponse } from "next/server";

const prismaErrorHandler = (err: any, entity?: string) => {
  if (err.code) {
    // Handle Prisma error instances
    switch (err.code) {
      case "P2002":
        // Unique constraint violation error
        return {
          message: `${entity} already exists.`,
          error: err.message,
          statusCode: 400,
        };

      case "P2025":
        // Record not found error
        return {
          message: `${entity} not found.`,
          error: err.message,
          statusCode: 404,
        };
      case "P2016":
        // Invalid JSON value error
        return {
          message: `Invalid ${entity} value was sent.`,
          error: err.message,
          statusCode: 400,
        };
      // Add more cases for other commonly occurring Prisma error codes as needed
      default:
        // Handle other Prisma error codes
        return {
          message: "Internal Server Error",
          error: err.message,
          statusCode: 500,
        };
    }
  }
};

export default prismaErrorHandler;
