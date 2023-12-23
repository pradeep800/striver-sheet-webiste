import Stripe from "stripe";
import { env } from "@/env.mjs";
export const stripe = new Stripe(env.STRIPE_SECRET, {
  apiVersion: "2022-11-15",
  typescript: true,
});
