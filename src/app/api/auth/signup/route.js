import connectToDB from "@/configs/db";
import { generateToken, hashPassword } from "@/lib/auth";
import User from "@/models/User";
import { NextResponse } from "next/server";
// import { NextResponse } from "next/server";
// import { serialize } from "cookie";

export async function POST(req) {
  // const cookieStore = await cookies();
  try {
    connectToDB();

    const { firstname, lastname, username, email, password } = await req.json();

    // Validation ✅
    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return NextResponse.json({ status: 422, message: "data not valid!" });
    }

    // isUserExist ✅
    const isUserExist = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserExist)
      return NextResponse.json({
        status: 422,
        message: "this username or email already exist",
      });

    // Hash password ✅
    const hashedPass = await hashPassword(password);

    // Generate Token ✅
    const token = generateToken(email);

    // Create User ✅
    const users = await User.find({});
    await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPass,
      role: users.length > 0 ? "USER" : "ADMIN",
    });

    const response = NextResponse.json({
      status: 201,
      message: "user created successfully",
      token,
    });
    response.cookies.set("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ status: 500, message: "internal server error" });
  }
}
