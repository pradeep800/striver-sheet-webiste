"use server";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";
import { env } from "@/env.mjs";
import { serverSession } from "@/lib/serverSession";
import {
  LogServerAndReturnError,
  ReturnNoSession,
} from "@/lib/serverActionUtils";
import { Session } from "next-auth";

export async function BuyProSubscription() {
  const BillingURL = absoluteUrl("/sheet/settings");
  const PricingURL = absoluteUrl("/pricing");
  let session: Session | undefined;
  try {
    session = await serverSession();

    if (!session) {
      return ReturnNoSession();
    }
    if (session.user.role === "PROUSER") {
      return { url: "You are already PROUSER" };
    }

    let email: string | undefined;
    if (session.user.email) {
      email = session.user.email;
    }
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: BillingURL,
      cancel_url: PricingURL,
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email,
      line_items: [{ price: env.STRIVER_PRO_SUB_ID, quantity: 1 }],
      metadata: {
        userId: session.user.id,
      },
    });

    const url = stripeSession.url;
    return { url: url };
  } catch (err) {
    return LogServerAndReturnError("buyProSubscription", err, session);
  }
}
