import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({
    status: 200,
    message: "logged out successfully",
  });
  response.cookies.set("token", "", { path: "/", maxAge: 0 });
  return response;
}
