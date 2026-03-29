import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  const isLocalRequest = request.url.includes("localhost") || request.url.includes("127.0.0.1");
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production" && !isLocalRequest,
    path: "/",
    maxAge: 0,
  });

  return response;
}
