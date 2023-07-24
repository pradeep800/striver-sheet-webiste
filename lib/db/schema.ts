import {
  int,
  timestamp,
  varchar,
  mysqlEnum,
  json,
  datetime,
  boolean,
  text,
  index,
  uniqueIndex,
  mysqlTableCreator,
} from "drizzle-orm/mysql-core";

const role_enum = mysqlEnum("role", ["USER", "PROUSER", "ADMIN"]);
const problem_state_enum = mysqlEnum("problem_status", [
  "UNATTEMPTED",
  "REMINDER",
  "SOLVED",
]);
const table = mysqlTableCreator((name) => `striver_sheet_${name}`);

export const accounts = table(
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

export const sessions = table(
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

export const users = table(
  "users",
  {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("emailVerified"),
    image: varchar("image", { length: 255 }),
    role: role_enum.default("USER").notNull(),
    userName: varchar("user_name", { length: 15 }).notNull(),
    leftProfileChanges: int("left_profile_changes").notNull().default(2),
    description: varchar("description", { length: 205 }),

    default_should_send_email: boolean("default_should_send_email")
      .default(false)
      .notNull(),
    stripe_customer_id: varchar("stripe_customer_id", { length: 255 }),
    stripe_subscription_id: varchar("stripe_subscription_id", { length: 255 }),
    stripe_price_id: varchar("stripe_price_id", { length: 255 }),
    pro_subscription_end: timestamp("pro_subscription_end"),

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

export const verificationTokens = table(
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

export const questions = table(
  "questions",
  {
    id: int("id").notNull().autoincrement().primaryKey(),
    sheet_id: varchar("sheet_id", { length: 255 }).notNull(),
    number: int("number").notNull(),
    title: varchar("name", { length: 301 }).notNull(),
    solved: problem_state_enum.notNull().default("UNATTEMPTED"),
    day: int("day").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").onUpdateNow().defaultNow(),
  },
  (question) => ({
    questionIndex: index("update_at_idx").on(question.updated_at),
    sheetIdIndex: index("sheet_id_idx").on(question.sheet_id),
  })
);

export const reminders = table(
  "reminders",
  {
    id: int("id").notNull().autoincrement().primaryKey(),

    created_at: timestamp("created_at").defaultNow(),
    due_date: timestamp("due_time").notNull(),
    should_send_mail: boolean("should_send_mail").notNull(),
    mail_sended: boolean("mail_sended").default(false).notNull(),
    user_id: varchar("user_id", {
      length: 255,
    }).notNull(),

    question_no: int("question_no").notNull(),
  },
  (reminder) => ({
    ReminderCreatorIdIndex: index("reminder_creator_id_index").on(
      reminder.user_id
    ),
  })
);

export const trackingQuestions = table(
  "tracking_questions",
  {
    id: int("id").notNull().autoincrement().primaryKey(),
    created_at: timestamp("created_at").defaultNow(),
    question_number: int("question_number").notNull(),
    user_id: varchar("user_id", { length: 255 }).notNull(),
  },
  (trackingQuestions) => ({
    UserIdIndex: index("user_id_idx").on(trackingQuestions.user_id),
  })
);
const feedback_type = mysqlEnum("feedback_type", [
  "BUG",
  "FEEDBACK",
  "REQUEST",
]);
export const feedbacks = table(
  "feedbacks",
  {
    id: int("id").notNull().autoincrement().primaryKey(),
    created_at: timestamp("create_at").defaultNow(),
    type: feedback_type.notNull(),
    user_id: varchar("user_id", { length: 255 }).notNull(),
    user_role: role_enum.notNull(),
    content: varchar("content", { length: 1001 }),
    mail: varchar("mail", { length: 255 }).notNull(),
  },
  (feedback) => ({ UserIdIndex: index("user_id_idx").on(feedback.user_id) })
);

export const notes = table(
  "notes",
  {
    id: int("id").notNull().autoincrement().primaryKey(),
    question_no: int("question_no").notNull(),
    sheet_id: varchar("sheet_id", { length: 255 }).notNull(),
    content: json("content"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").onUpdateNow().defaultNow(),
  },
  (notes) => ({ sheetIndex: index("sheet_id_idx").on(notes.sheet_id) })
);
