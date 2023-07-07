import {
  int,
  timestamp,
  mysqlTable,
  varchar,
  mysqlEnum,
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
  "SOLVED",
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
    userName: varchar("user_name", { length: 40 }),
    leftProfileChanges: int("left_profile_changes").notNull().default(2),
    description: varchar("description", { length: 205 }),

    email_reminders: boolean("email_reminders").default(true),
    stripe_customer_id: varchar("stripe_customer_id", { length: 255 }),
    stripe_subscription_id: varchar("stripe_subscription_id", { length: 255 }),
    stripe_price_id: varchar("stripe_price_id", { length: 255 }),
    pro_subscription_end: datetime("pro_subscription_end"),

    striver_sheet_id_30_days: varchar("striver_sheet_id_30_days", {
      length: 255,
    }).notNull(),
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
    id: int("id").notNull().autoincrement().primaryKey(),
    sheet_id: varchar("sheet_id", { length: 255 }).notNull(),
    number: int("number").notNull(),
    title: varchar("name", { length: 300 }).notNull(),
    notes_content: json("content"),
    solved: problem_state_enum.notNull().default("UNATTEMPTED"),
    question_day_in_sheet: int("question_day_in_sheet").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").onUpdateNow().defaultNow(),
  },
  (question) => ({
    questionIndex: index("update_at_idx").on(question.updated_at),
    sheetIdIndex: index("sheet_id_idx").on(question.sheet_id),
  })
);

export const reminders = mysqlTable(
  "reminders",
  {
    id: int("id").notNull().autoincrement().primaryKey(),
    created_at: timestamp("created_at").defaultNow(),
    due_date: datetime("due_time").notNull(),
    should_send_mail: boolean("should_send_mail"),
    mail_sended: boolean("mail_sended").default(false),
    creator_id: varchar("creator_id", {
      length: 255,
    }).notNull(),
  },
  (reminder) => ({
    ReminderCreatorIdIndex: index("reminder_creator_id_index").on(
      reminder.creator_id
    ),
  })
);

export const trackingQuestions = mysqlTable(
  "tracking_questions",
  {
    id: int("id").notNull().autoincrement().primaryKey(),
    createdAt: timestamp("createdAt").defaultNow(),
    questionNumber: int("questionNumber").notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
  },
  (trackingQuestions) => ({
    UserIdIndex: index("user_id_idx").on(trackingQuestions.userId),
  })
);
const feedback_type = mysqlEnum("feedback_type", [
  "BUG",
  "FEEDBACK",
  "REQUEST",
]);
export const feedbacks = mysqlTable(
  "feedbacks",
  {
    id: int("id").notNull().autoincrement().primaryKey(),
    createdAt: timestamp("createdAt").defaultNow(),
    type: feedback_type.notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
    userRole: role_enum.notNull(),
    content: varchar("content", { length: 1000 }),
  },
  (feedback) => ({ UserIdIndex: index("userIdIndex").on(feedback.userId) })
);
