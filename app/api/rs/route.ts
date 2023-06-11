// import { db } from "@/lib/db";
// import { users } from "@/lib/db/schema";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function GET() {
//   await db.update(users).set({
//     pro_subscription_end: null,
//     stripe_customer_id: null,
//     stripe_price_id: null,
//     stripe_subscription_id: null,
//     role: "USER",
//   });
//   return NextResponse.json({ Yes: "Yes" });
// }
