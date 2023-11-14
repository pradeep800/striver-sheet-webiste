import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { users } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import MainPricing from "./mainPricing";
export default async function Pricing() {
  const session = await getServerSession(authOption);
  const sessionUser = session?.user;

  if (sessionUser) {
    const [user] = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.id, sessionUser.id));

    if (!user) {
      redirect("/accountDeleted");
    }

    if (user.role === "PROUSER") {
      redirect("/sheet?error=you are already a PROUSER");
    }
  }
  return (
    <div className="mt-8 min-h-[80vh] flex justify-center items-center">
      <MainPricing
        backUrl="/login?callback=%2Fpricing"
        sessionUser={sessionUser}
      />
    </div>
  );
}
