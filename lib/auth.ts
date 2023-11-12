import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { env } from "@/env.mjs";
import { getValidationMail } from "./verficationMail";
import { DrizzleAdapter } from "./drizzleAdapater";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

export const authOption: NextAuthOptions = {
  adapter: DrizzleAdapter(),
  pages: { signIn: "/login", error: "/login/error" },
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
      from: "verification@pradeepbisht.com",
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const resend = new Resend(env.RESEND_API_KEY);

        const data = await resend.emails.send({
          from: "verification@pradeepbisht.com",
          to: [identifier],
          subject: "Verification Link",
          headers: {
            "X-Entity-Ref-ID": Date.now().toString(),
          },
          html: getValidationMail(url),
        });

        console.log(data);
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
          userName: token.userName,
        },
      };
    },
    //user only will be present when we first login
    jwt: async ({ token, user, trigger }) => {
      //when you trigger update it will check role and then update the token accordingly
      if (trigger === "update") {
        const [{ role, name, image, userName }] = await db
          .select({
            role: users.role,
            image: users.image,
            name: users.name,
            userName: users.userName,
          })
          .from(users)
          .where(eq(users.id, token.id));

        token.picture = image;
        token.name = name;
        token.role = role;
        token.userName = userName;
        return token;
      }
      const User = user as {
        role: "PROUSER" | "USER" | "ADMIN";
        id: string;
        userName: string;
      };
      if (User) {
        return {
          ...token,
          role: User.role,
          id: User.id,
          userName: User.userName,
        };
      }
      return token;
    },
  },
};
