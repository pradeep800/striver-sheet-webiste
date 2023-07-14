import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { and, eq, isNotNull, lt } from "drizzle-orm";
import { NextResponse } from "next/server";
export const runtime = "edge";
export const revalidate = 0;
export async function GET() {
  const todayDate = new Date();

  await db
    .update(users)
    .set({ role: "USER" })
    .where(
      and(
        eq(users.role, "PROUSER"),
        and(
          lt(users.pro_subscription_end, todayDate),
          isNotNull(users.pro_subscription_end)
        )
      )
    );
  return NextResponse.json({ Response: "successfully done" });
}
