import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { env } from "@/env.mjs";
import { getValidationMail } from "./verficationMail";
import { MailOptions } from "nodemailer/lib/json-transport";
import nodemailer from "nodemailer";
import { DrizzleAdapter } from "./drizzleAdapater";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

export const authOption: NextAuthOptions = {
  adapter: DrizzleAdapter(),
  pages: { signIn: "/register-or-login", error: "/register-or-login/error" },
  session: { strategy: "jwt" },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      httpOptions: {
        timeout: 10000,
      },
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
      httpOptions: {
        timeout: 10000,
      },
      allowDangerousEmailAccountLinking: true,
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
          html: getValidationMail(url),
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
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
          id: token.id,
        },
      };
    },
    //user only will be present when we first Login
    jwt: async ({ token, user, trigger }) => {
      //when you trigger update it will check role and then update the token accordingly
      if (trigger === "update") {
        const [{ role }] = await db
          .select({ role: users.role })
          .from(users)
          .where(eq(users.id, user.id));

        token.role = role;
        return token;
      }
      const User = user as { role: "PROUSER" | "USER" | "ADMIN"; id: string };
      if (User) {
        return { ...token, role: User.role, id: User.id };
      }
      return token;
    },
  },
};
