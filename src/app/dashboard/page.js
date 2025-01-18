import connectToDB from "@/configs/db";
import { verifyToken } from "@/lib/auth";
import User from "@/models/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function Dashboard() {
  connectToDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    redirect("/signin");
  }
  const tokenPayload = verifyToken(token?.value);

  if (!tokenPayload) {
    redirect("/");
  }
  const { firstname, lastname } = await User.findOne(
    { email: tokenPayload.email },
    "firstname lastname"
  );

  return (
    <div className="ml-7 mt-5">
      <h1>
        Hello {firstname} {lastname}
      </h1>
      <h1>welcome to the dashboard page</h1>
    </div>
  );
}

export default Dashboard;
