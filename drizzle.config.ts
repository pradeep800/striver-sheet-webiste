import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();
export default {
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  driver: "mysql2",

  dbCredentials: {
    //if you are seeing this please let me know
    connectionString: process.env.DATABASE_URL as string,
  },
  breakpoints: true,
} satisfies Config;
