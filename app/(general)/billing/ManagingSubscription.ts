"use server";
///server action
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export default async function ManageSubscription() {
  const session = await getServerSession(authOption);
  const BillingURL = absoluteUrl("/billing");
  if (!session) {
    redirect("/?error=please login");
  }

  const [user] = await db
    .select({ role: users.role, customerId: users.stripe_customer_id })
    .from(users)
    .where(eq(users.id, session.user.id));
  if (user.role === "USER" || !user.customerId) {
    redirect(
      "/pricing?error=Please first buy subscription after you can manage it"
    );
  }
  let stripeSession!: Stripe.Response<Stripe.BillingPortal.Session>;
  try {
    stripeSession = await stripe.billingPortal.sessions.create({
      customer: user.customerId,
      return_url: BillingURL,
    });
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    redirect("/price?error=Server Error");
  }

  redirect(stripeSession.url);
}
