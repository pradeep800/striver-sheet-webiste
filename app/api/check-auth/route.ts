import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getServerSession(authOption);
  return NextResponse.json(data);
}
