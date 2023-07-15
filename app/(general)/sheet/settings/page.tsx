import DeleteAccount from "@/components/deleteAccount";
import Billing from "@/components/manageBilling";
import ShouldSendEmailSetting from "@/components/shouldSendEmailSetting";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SettingPage() {
  const session = await getServerSession(authOption);
  if (!session || !session.user) {
    redirect("/");
  }
  const [userInfo] = await db
    .select({
      default_should_send_email: users.default_should_send_email,
      stripeCustomerId: users.stripe_customer_id,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!userInfo) {
    redirect("/accountDeleted");
  }

  const user = session.user;
  return (
    <div className="max-w-[800px] mx-auto">
      {userInfo.stripeCustomerId ? <Billing /> : null}
      {userInfo.role === "PROUSER" || userInfo.role === "ADMIN" ? (
        <ShouldSendEmailSetting
          user={user}
          default_should_send_email={
            userInfo.default_should_send_email as boolean
          }
        />
      ) : null}
      <DeleteAccount user={user} />
    </div>
  );
}
