import UpgradingAccount from "@/components/upgradingAccount";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { absoluteUrl } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import NextAuth from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Billing() {
  const session = await getServerSession(authOption);

  if (!session) {
    redirect("/pricing");
  }

  const [{ role }] = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, session?.user.id));

  if (role === "USER") {
    redirect("/pricing");
  }

  if (role == "PROUSER" && session.user.role == "USER") {
    return <UpgradingAccount />;
  }

  return <div>billing</div>;
}
