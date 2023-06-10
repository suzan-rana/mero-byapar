import { type NextRequest, NextResponse } from "next/server";
import { validateUser } from "@/lib/auth";

export function GET(request: NextRequest) {
  const user = validateUser(request)
}


