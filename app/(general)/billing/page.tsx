import UpgradingAccount from "@/components/upgradingAccount";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import BillingPage from "./BillingPage";

export default async function Billing() {
  const session = await getServerSession(authOption);

  if (!session) {
    redirect("/pricing");
  }

  //fetch role from db
  const [{ role }] = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, session?.user.id));

  if (
    (role === "USER" && session.user.role === "PROUSER") ||
    (role == "PROUSER" && session.user.role == "USER")
  ) {
    return <UpgradingAccount />;
  }

  if (role === "USER") {
    redirect("/pricing");
  }

  return <BillingPage />;
}
