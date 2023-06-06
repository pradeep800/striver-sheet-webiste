import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json(await db.select().from(users));
}
