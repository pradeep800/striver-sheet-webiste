import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();
export default {
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  driver: "mysql2",

  dbCredentials: {
    user: process.env.DB_USER as string,
    database: process.env.DATABASE as string,
    password: process.env.PASSWORD as string,
    host: process.env.HOST as string,
    port: parseInt(process.env.PORT as string, 10),
  },
  breakpoints: true,
} satisfies Config;
