import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { env } from "@/env.mjs";
import verificationTemplate from "@/lib/VerificationMailTemplate";
import { MailOptions } from "nodemailer/lib/json-transport";
import nodemailer from "nodemailer";
export const authOption: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  pages: { signIn: "/register-or-login", error: "/register-or-login/error" },
  session: { strategy: "jwt" },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      httpOptions: {
        timeout: 10000,
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
      httpOptions: {
        timeout: 10000,
      },
    }),
    EmailProvider({
      from: env.GMAIL,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const mailTransporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: env.GMAIL,
            pass: env.GENERATED_PASSWORD,
          },
        });
        const mailOptions: MailOptions = {
          from: env.GMAIL,
          to: identifier,
          subject: "Verification Link",
          html: verificationTemplate(url),
          headers: {
            References: Date.now().toString(),
          },
        };
        await new Promise((resolve, reject) => {
          mailTransporter.sendMail(mailOptions, (err, data) => {
            if (err) {
              console.log(err.message);
              reject(err);
            } else {
              console.log(
                "gmail send successfully. data response:-",
                data.response
              );
              resolve(data);
            }
          });
        });
      },
    }),
  ],
};
