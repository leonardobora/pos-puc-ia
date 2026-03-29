import { NextResponse } from "next/server";
import { isAuthenticatedRequest } from "@/lib/auth";

export async function GET(request: Request) {
  const authenticated = isAuthenticatedRequest(request);
  return NextResponse.json({ authenticated });
}
