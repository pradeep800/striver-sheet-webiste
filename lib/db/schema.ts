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
  index,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

const role_enum = mysqlEnum("role", ["USER", "PROUSER", "ADMIN"]);
const problem_state_enum = mysqlEnum("problem_status", [
  "UNATTEMPTED",
  "REMINDER",
  "SOLVE",
]);
export const accounts = mysqlTable(
  "accounts",
  {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    access_token: text("access_token"),
    expires_in: int("expires_in"),
    id_token: text("id_token"),
    refresh_token: text("refresh_token"),
    refresh_token_expires_in: int("refresh_token_expires_in"),
    scope: varchar("scope", { length: 255 }),
    token_type: varchar("token_type", { length: 255 }),
    createdAt: timestamp("createdAt").defaultNow().onUpdateNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (account) => ({
    providerProviderAccountIdIndex: uniqueIndex(
      "accounts__provider__providerAccountId__idx"
    ).on(account.provider, account.providerAccountId),
    userIdIndex: index("accounts__userId__idx").on(account.userId),
  })
);

export const sessions = mysqlTable(
  "sessions",
  {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: datetime("expires").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow().onUpdateNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (session) => ({
    sessionTokenIndex: uniqueIndex("sessions__sessionToken__idx").on(
      session.sessionToken
    ),
    userIdIndex: index("sessions__userId__idx").on(session.userId),
  })
);

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("emailVerified"),
    image: varchar("image", { length: 255 }),
    role: role_enum.default("USER").notNull(),

    stripe_customer_id: varchar("stripe_customer_id", { length: 255 }),
    stripe_subscription_id: varchar("stripe_subscription_id", { length: 255 }),
    stripe_price_id: varchar("stripe_price_id", { length: 255 }),
    pro_subscription_end: datetime("pro_subscription_end"),

    striver_sheet_id_30_days: varchar("id", { length: 255 }).notNull(),

    created_at: timestamp("created_at").notNull().defaultNow().onUpdateNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (user) => ({
    emailIndex: uniqueIndex("users__email__idx").on(user.email),
  })
);

export const verificationTokens = mysqlTable(
  "verification_tokens",
  {
    identifier: varchar("identifier", { length: 255 }).primaryKey().notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: datetime("expires").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow().onUpdateNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (verificationToken) => ({
    tokenIndex: uniqueIndex("verification_tokens__token__idx").on(
      verificationToken.token
    ),
  })
);

export const questions = mysqlTable(
  "questions",
  {
    question_id: int("question_id").notNull().autoincrement().primaryKey(),
    solved: problem_state_enum.notNull().default("UNATTEMPTED"),
    question_no: int("question_no").notNull(),
    question_name: varchar("question_name", { length: 300 }).notNull(),
    sheet_id: varchar("id", { length: 255 }).notNull(),
  },
  (question) => ({
    sheetIdIndex: index("sheet_id_idx").on(question.sheet_id),
  })
);
export const notes = mysqlTable(
  "notes",
  {
    note_id: int("note_id").autoincrement().notNull().primaryKey(),
    title: varchar("title", { length: 300 }).notNull(), //question_name
    content: json("content"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").onUpdateNow(),
    author_id: varchar("user_id", { length: 255 }).notNull(),
  },
  (note) => ({
    authorIdIndex: index("author_id_idx").on(note.author_id),
  })
);

export const reminders = mysqlTable(
  "reminders",
  {
    reminder_id: int("reminder_id").notNull().autoincrement().primaryKey(),
    created_at: timestamp("created_at").defaultNow(),
    reminder_due_date: datetime("reminder_due_time").notNull(),
    mail_sended: boolean("mail_sended").default(false),
    reminder_creator_id: varchar("user_id", { length: 255 }).notNull(),
  },
  (reminder) => ({
    ReminderCreatorIdIndex: index("reminder_creator_id_index").on(
      reminder.reminder_creator_id
    ),
  })
);
