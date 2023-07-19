import NavBar from "@/components/navbar";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import Footer from "@/components/footer";
import { Provider } from "@/components/sessionProvider";
import ToastRedirect from "@/components/toastRedirect";
import Confetti from "@/components/confetti";
import { users } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOption);
  const user = session?.user;
  let stripeCustomerId: null | string = null;

  if (session && session.user) {
    const [user] = await db
      .select({ customerId: users.stripe_customer_id })
      .from(users)
      .where(eq(users.id, session.user.id));
    if (user && user.customerId) stripeCustomerId = user.customerId;
  }

  return (
    <Provider>
      <NavBar user={user} stripeCustomerId={stripeCustomerId} />
      <ToastRedirect />
      <main className="min-h-[80vh]">{children}</main>
      <div className="pt-3">
        <Footer />
      </div>
      <Confetti />
    </Provider>
  );
}
