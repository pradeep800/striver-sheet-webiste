"use server";
import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";
import { env } from "@/env.mjs";

export async function BuyProSubscription() {
  const BillingURL = absoluteUrl("/billing");
  const PricingURL = absoluteUrl("/pricing");
  const session = await getServerSession(authOption);

  if (!session || !session?.user || !session.user?.email) {
    redirect("register-or-login?callback=%2Fpricing");
  }
  console.log(session.user.role);
  if (session.user.role === "PROUSER") {
    redirect("/billing");
  }
  console.log(BillingURL);
  console.log(PricingURL);

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: BillingURL,
    cancel_url: PricingURL,
    payment_method_types: ["card"],
    mode: "subscription",
    customer_email: session.user.email,
    line_items: [{ price: env.STRIVER_PRO_SUB_ID, quantity: 1 }],
    metadata: {
      userId: session.user.id,
    },
  });

  const url = stripeSession.url;
  console.log("stripe session", url);
  redirect(stripeSession.url as string);
}