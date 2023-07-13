import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import * as s from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  // await db.execute(sql`TRUNCATE TABLE ${s.questions}`);
  // await db.execute(sql`TRUNCATE TABLE ${s.accounts}`);
  // await db.execute(sql`TRUNCATE TABLE ${s.reminders}`);
  // await db.execute(sql`TRUNCATE TABLE ${s.sessions}`);
  // await db.execute(sql`TRUNCATE TABLE ${s.trackingQuestions}`);
  // await db.execute(sql`TRUNCATE TABLE ${s.users}`);
  // await db.execute(sql`TRUNCATE TABLE ${s.verificationTokens}`);
  // const session = await getServerSession(authOption);
  // if (!session || !session.user) {
  //   return NextResponse.json({ yes: "no" });
  // }
  // await db
  //   .update(s.users)
  //   .set({ leftProfileChanges: 100 })
  //   .where(eq(s.users.id, session.user.id));

  const data = await db.select().from(s.reminders);
  const [a] = data;

  return NextResponse.json(a.due_date.toISOString());
}
