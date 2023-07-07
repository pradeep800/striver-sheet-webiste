import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import EmailTemplate from "@/components/emailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  // try {
  //   const data = await resend.emails.send({
  //     from: "no-reply@pradeepbisht.com",
  //     to: "pradeep8b0@gmail.com",
  //     subject: "Hello world",
  //     html: "<strong>It works!</strong>",
  //     react: EmailTemplate({ name: "pradeep" }),
  //   });

  //   return NextResponse.json(data);
  // } catch (error) {
  //   return NextResponse.json(error, { status: 500 });
  // }
  return NextResponse.json({ hello: "there" });
}
