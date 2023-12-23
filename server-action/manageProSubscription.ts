"use server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { serverSession } from "@/lib/serverSession";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Stripe from "stripe";
//redirect don't work without form
export default async function manageSubscription() {
  const session = await serverSession();
  const settingUrl = absoluteUrl("/sheet/settings");
  if (!session) {
    redirect("/?error=please login");
  }

  const [user] = await db
    .select({ role: users.role, customerId: users.stripe_customer_id })
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!user) {
    return redirect("/accountDeleted");
  }
  if (!user.customerId) {
    redirect(
      "/pricing?error=Please first buy subscription after you can manage it"
    );
  }
  let stripeSession!: Stripe.Response<Stripe.BillingPortal.Session>;
  try {
    stripeSession = await stripe.billingPortal.sessions.create({
      customer: user.customerId,
      return_url: settingUrl,
    });
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    redirect("/sheet/settings?error=Server Error");
  }

  redirect(stripeSession.url);
}
