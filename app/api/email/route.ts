import { NextResponse } from "next/server";
import { Resend } from "resend";
import { env } from "@/env.mjs";
import EmailReminder from "@/components/emailTemplate/emailReminder";
const resend = new Resend(env.RESEND_API_KEY as string);
export async function GET() {
  const a = await resend.emails.send({
    from: "reminders@pradeepbisht.com",
    to: "pradeep8b0@gmail.com",
    subject: "Reminders",
    react: EmailReminder({
      questionsInfo: [{ day: 1, questionNo: 1, title: "hello there" }],
    }),
  });
  return NextResponse.json({ hello: "nope" });
}
