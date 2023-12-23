import NavBar from "@/components/navbar";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import Footer from "@/components/footer";
import { Provider } from "@/components/sessionProvider";
import ToastRedirect from "@/components/toastRedirect";
import { Confetti } from "@/components/confetti";
import { reminders, users } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq, sql } from "drizzle-orm";
import { getIndianTime } from "@/lib/dateTimeFun";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOption);
  const user = session?.user;
  let stripeCustomerId: null | string = null;
  let showNotification = false;
  if (session && session.user) {
    const [user] = await db
      .select({ customerId: users.stripe_customer_id, id: users.id })
      .from(users)
      .where(eq(users.id, session.user.id));
    if (user && user.customerId) stripeCustomerId = user.customerId;
    const date = getIndianTime();

    const [data] = await db
      .select({ reminderId: reminders.id })
      .from(reminders)
      .where(
        sql`${reminders.user_id}=${user.id} and day(CONVERT_TZ(${reminders.due_date}, 'UTC', 'Asia/Kolkata')) <= ${date.day} and month(CONVERT_TZ(${reminders.due_date}, 'UTC', 'Asia/Kolkata')) <= ${date.month} and year(CONVERT_TZ(${reminders.due_date}, 'UTC', 'Asia/Kolkata')) <= ${date.year} `
      )
      .limit(1);
    showNotification = data ? true : false;
  }

  return (
    <Provider>
      <NavBar
        user={user}
        stripeCustomerId={stripeCustomerId}
        showNotification={showNotification}
      />
      <ToastRedirect />
      <main className="min-h-[80vh]">{children}</main>
      <div className="pt-3">
        <Footer />
      </div>
      <Confetti />
    </Provider>
  );
}
