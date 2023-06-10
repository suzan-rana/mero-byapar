import { type NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export function GET(request: NextRequest) {}

const validateUser = (request: NextRequest) => {
  const [type, token] = request.headers.get("authorization")?.split(" ") || [];
  if (type !== "Bearer" || !token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
        error: "Invalid token",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const decoded = verifyToken(token);
    return decoded;
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unauthorized",
        error: "Invalid token",
      },
      {
        status: 401,
      }
    );
  }
};
