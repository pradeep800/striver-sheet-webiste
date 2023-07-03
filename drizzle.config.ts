import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  driver: "mysql2",
  dbCredentials: { connectionString: process.env.DATABASE_URL as string },
  breakpoints: true,
} satisfies Config;
