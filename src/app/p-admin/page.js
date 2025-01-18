import connectToDB from "@/configs/db";
import { verifyToken } from "@/lib/auth";
import User from "@/models/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function AdminPanel() {
  connectToDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    redirect("/signin");
  }
  const tokenPayload = verifyToken(token?.value);
  if (!tokenPayload) {
    redirect("/signin");
  }
  const { role, firstname, lastname } = await User.findOne({
    email: tokenPayload.email,
  });

  if (role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="ml-7 mt-5">
      <h1>
        Dear {firstname} {lastname}
      </h1>
      <h2>Welcome To Admin Panel</h2>
    </div>
  );
}

export default AdminPanel;
