import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    DATABASE_URL: z.string().min(1),
    GITHUB_ID: z.string().min(1),
    GITHUB_SECRET: z.string().min(1),
    GOOGLE_ID: z.string().min(1),
    GOOGLE_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().min(1),
    STRIPE_SECRET: z.string().min(1),
    STRIVER_PRO_SUB_ID: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    LAMBDA_SECRET: z.string().min(1),
    PORT: z
      .string()
      .transform((val) => parseInt(val, 10))
      .pipe(z.number()),
    HOST: z.string(),
    PASSWORD: z.string(),
    DB_USER: z.string(),
    DATABASE: z.string(),
  },
  client: {
    NEXT_PUBLIC_STRIPE_SECRET: z.string().min(1),
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.NODE_ENV,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    STRIPE_SECRET: process.env.STRIPE_SECRET,
    NEXT_PUBLIC_STRIPE_SECRET: process.env.NEXT_PUBLIC_STRIPE_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    STRIVER_PRO_SUB_ID: process.env.STRIVER_PRO_SUB_ID,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    LAMBDA_SECRET: process.env.LAMBDA_SECRET,
    DATABASE: process.env.DATABASE,
    DB_USER: process.env.DB_USER,
    PASSWORD: process.env.PASSWORD,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
  },
});
