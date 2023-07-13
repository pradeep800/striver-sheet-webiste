import { NextResponse } from "next/server";
export const revalidate = 0;
export function GET() {
  const a = new Date();
  const options = { timeZone: "Asia/Kolkata" };
  const indianDate = a.toLocaleDateString("en-US", options);
  return NextResponse.json({ indianDate, vercelDate: new Date() });
}
