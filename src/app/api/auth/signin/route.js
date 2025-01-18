// import connectToDB from "@/configs/db";

import connectToDB from "@/configs/db";
import { generateToken, verifyPassword } from "@/lib/auth";
import User from "@/models/User";
import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     connectToDB();
//     const { userOrEmail, password } = await req.json();
//     // Validation
//     if (!userOrEmail.trim() || !password.trim()) {
//       return Response.json({ status: 422, message: "data not valid!" });
//     }

//     return Response.json({ status: 200, message: "Welocme" });
//   } catch (error) {
//     return Response.json({ status: 500, message: "internal server error" });
//   }
// }

export async function POST(req) {
  try {
    connectToDB();
    const { userIdentifier, password } = await req.json();

    // Validation
    if (!userIdentifier.trim() || !password.trim()) {
      return NextResponse.json({ status: 422, message: "data not valid!" });
    }

    // is user exist
    const user = await User.findOne({
      $or: [{ username: userIdentifier }, { email: userIdentifier }],
    });
    console.log(user);

    if (!user) {
      return NextResponse.json({ status: 404, message: "user not found" });
    }

    // is password correct
    const isPassVerified = await verifyPassword(password, user.password);
    // console.log(isPassVerified);

    if (!isPassVerified) {
      return NextResponse.json({
        status: 422,
        message: " username or password is incorrect",
      });
    }

    // generate token
    const token = generateToken({ email: user.email });

    // login
    const response = NextResponse.json({ status: 201, message: "Welcome" });
    response.cookies.set("token", token, {
      path: "/",
      maxAge: 24 * 60 * 60,
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ status: 500, message: "internal server error" });
  }
}
