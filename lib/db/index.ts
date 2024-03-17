import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
const pool = mysql.createPool({
  user: process.env.DB_USER as string,
  database: process.env.DATABASE as string,
  password: process.env.PASSWORD as string,
  host: process.env.HOST as string,
  connectTimeout: 30 * 1000,
});

export const db = drizzle(pool);
