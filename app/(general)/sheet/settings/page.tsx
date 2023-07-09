import { signOutAction } from "@/app/example/seraction";
import DeleteAccount from "@/components/deleteAccount";
import Billing from "@/components/manageBilling";
import ShouldSendEmailSetting from "@/components/shouldSendEmailSetting";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SettingPage() {
  const session = await getServerSession(authOption);
  if (!session || !session.user) {
    redirect("/");
  }
  const [userInfo] = await db
    .select({ emailReminder: users.email_reminders })
    .from(users)
    .where(eq(users.id, session.user.id));
  if (!userInfo) {
    await signOutAction();
    redirect("/login");
  }
  const user = session.user;
  return (
    <div className="max-w-[800px] mx-auto">
      {user.role === "PROUSER" ? <Billing /> : null}
      {user.role === "PROUSER" ? (
        <ShouldSendEmailSetting
          user={user}
          emailReminder={userInfo.emailReminder as boolean}
        />
      ) : null}
      <DeleteAccount user={user} />
    </div>
  );
}
