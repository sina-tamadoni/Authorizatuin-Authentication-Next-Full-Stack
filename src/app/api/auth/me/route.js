import connectToDB from "@/configs/db";
import { verifyToken } from "@/lib/auth";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    connectToDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
  
    if (!token) {
      return NextResponse.json({
        status: 401,
        message: "You are not logged in",
      });
    }
    const tokenPayload = verifyToken(token.value);
    if (!tokenPayload) {
      return NextResponse.json({
        status: 401,
        message: "this user is not valid",
      });
    }
    const user = await User.findOne({ email: tokenPayload.email });
    return NextResponse.json({
      status: 200,
      message: "You are logged in",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "internal server error" });
  }
}
