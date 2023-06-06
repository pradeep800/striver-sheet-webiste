import {
  int,
  timestamp,
  mysqlTable,
  varchar,
  primaryKey,
  mysqlEnum,
  serial,
  json,
  datetime,
  boolean,
  text,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";

const role_enum = mysqlEnum("role", ["USER", "PROUSER", "ADMIN"]);
const problem_state_enum = mysqlEnum("problem_status", [
  "UNATTEMPTED",
  "REMINDER",
  "SOLVE",
]);

export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  role: role_enum.default("USER"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: varchar("image", { length: 255 }),
});

export const accounts = mysqlTable(
  "accounts",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = mysqlTable("sessions", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);
export const striverSheet = mysqlTable("striverSheet", {
  sheet_id: int("sheet_id").notNull().autoincrement().primaryKey(),
  user_id: varchar("user_id", { length: 255 }).notNull(),
});
export const question = mysqlTable("question", {
  question_id: int("question_id").notNull().autoincrement().primaryKey(),
  solved: problem_state_enum.notNull().default("UNATTEMPTED"),
  question_no: int("question_no").notNull(),
  question_name: varchar("question_name", { length: 300 }).notNull(),
  sheet_id: int("sheet_id").notNull(),
});
export const note = mysqlTable("note", {
  note_id: int("note_id").autoincrement().notNull().primaryKey(),
  title: varchar("title", { length: 300 }).notNull(), //question_name
  content: json("content"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").onUpdateNow(),
  author_id: varchar("userId", { length: 255 }).notNull(),
});

export const reminder = mysqlTable("reminder", {
  reminder_id: int("reminder_id").notNull().autoincrement().primaryKey(),
  created_at: timestamp("created_at").defaultNow(),
  reminder_due_date: datetime("reminder_due_time").notNull(),
  mail_sended: boolean("mail_sended").default(false),
  reminder_creator_id: varchar("userId", { length: 255 }).notNull(),
});
