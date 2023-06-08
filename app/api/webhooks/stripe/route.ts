import Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { env } from "@/env.mjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ConsoleLogUnableToStatusUpdate } from "@/lib/utils";
type WebhookHandlers = {
  "checkout.session.completed": (
    sessionObject: Stripe.Checkout.Session
  ) => Promise<void>;
  "invoice.payment_succeeded": (
    sessionObject: Stripe.Checkout.Session
  ) => Promise<void>;
};
//why we need to event because
/*
because checkout.session.complete have metadata and metadata have userId property which we can use for identifying user
there is no email or metadata.userId in invoice.payment_succeeded
*/
//

const webhookHandlers: WebhookHandlers = {
  "checkout.session.completed": async (sessionObject) => {
    const subscription = await stripe.subscriptions.retrieve(
      sessionObject.subscription as string
    );
    try {
      await db
        .update(users)
        .set({
          role: "PROUSER",
          stripe_subscription_id: subscription.id,
          stripe_customer_id: subscription.customer as string,
          stripe_price_id: subscription.items.data[0].price.id as string,
          pro_subscription_end: new Date(
            subscription.current_period_end * 1000
          ),
        })
        .where(eq(users.id, sessionObject.metadata?.userId as string));
    } catch (err) {
      const error = err as Error;
      ConsoleLogUnableToStatusUpdate(error.message, subscription.id);
    }
  },
  "invoice.payment_succeeded": async (sessionObject) => {
    const subscription = await stripe.subscriptions.retrieve(
      sessionObject.subscription as string
    );
    try {
      await db
        .update(users)
        .set({
          stripe_price_id: subscription.items.data[0].price.id as string,
          pro_subscription_end: new Date(
            subscription.current_period_end * 1000
          ),
        })
        .where(eq(users.stripe_subscription_id, subscription.id as string));
    } catch (err) {
      const error = err as Error;
      ConsoleLogUnableToStatusUpdate(error.message, subscription.id);
    }
  },
};

export async function POST(req: Request) {
  const rawBody = await req.text();

  const signature = headers().get("Stripe-Signature") as string;
  let event!: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json(
      { message: "unauthorized request" },
      { status: 401 }
    );
  }

  const eventType = event.type as keyof WebhookHandlers;
  const sessionObject = event.data.object as Stripe.Checkout.Session;
  await webhookHandlers[eventType](sessionObject);
  return NextResponse.json({ received: true });
}
