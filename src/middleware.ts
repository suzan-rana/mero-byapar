import { type NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const [type, token] = req.headers.get("authorization")?.split(" ") || [];
  return NextResponse.next();
}
