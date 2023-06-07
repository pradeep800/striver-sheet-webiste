import Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { env } from "@/env.mjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { eq } from "drizzle-orm";
type WebhookHandlers = {
  "invoice.payment_succeeded": (
    sessionObject: Stripe.Checkout.Session
  ) => Promise<void>;
};

const webhookHandlers: WebhookHandlers = {
  "invoice.payment_succeeded": async (sessionObject) => {
    const subscription = await stripe.subscriptions.retrieve(
      sessionObject.subscription as string
    );

    const data = await db
      .update(users)
      .set({
        role: "PROUSER",
        stripe_subscription_id: subscription.id,
        stripe_customer_id: subscription.customer as string,
        stripe_price_id: subscription.items.data[0].price.id as string,
        pro_subscription_end: new Date(subscription.current_period_end * 1000),
      })
      .where(eq(users.id, sessionObject?.metadata?.userId as string));
    console.log(data);
  },
};

export async function POST(req: Request) {
  const rawBody = await req.text();

  const signature = headers().get("Stripe-Signature") as string;
  const event = stripe.webhooks.constructEvent(
    rawBody,
    signature,
    env.STRIPE_WEBHOOK_SECRET
  );
  const eventType = event.type as keyof WebhookHandlers;
  const sessionObject = event.data.object as Stripe.Checkout.Session;
  await webhookHandlers[eventType](sessionObject);
  return NextResponse.json({ received: true });
}
