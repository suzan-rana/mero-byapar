import { NextResponse } from "next/server";

const prismaErrorHandler = (err: any) => {
  if (err.code) {
    // Handle Prisma error instances
    switch (err.code) {
      case "P2002":
        // Unique constraint violation error
        return NextResponse.json({
          error: "Duplicate entry",
          message: err.message,
        });
      case "P2025":
        // Record not found error
        return NextResponse.json({
          error: "Record not found",
          message: err.message,
        });
      case "P2016":
        // Invalid JSON value error
        return NextResponse.json({
          error: "Invalid JSON value",
          message: err.message,
        });
      // Add more cases for other commonly occurring Prisma error codes as needed
      default:
        // Handle other Prisma error codes
        return NextResponse.json({
          error: "Internal Server Error",
          message: err.message,
        });
    }
  }
};

export default prismaErrorHandler;
