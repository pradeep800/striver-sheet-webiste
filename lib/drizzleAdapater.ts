import { and, eq } from "drizzle-orm";
import { type Adapter } from "next-auth/adapters";
import { db } from "@/lib/db/index";
import * as schema from "@/lib/db/schema";

export function DrizzleAdapter(): Adapter {
  const { users, sessions, accounts, verificationTokens } = schema;
  return {
    createUser: async (data) => {
      const id = crypto.randomUUID();

      await db.insert(users).values({ ...data, id });

      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .then((res) => res[0]);
      return user!;
    },
    getUser: async (data) => {
      const user = await db.select().from(users).where(eq(users.id, data));
      return user[0] ?? null;
    },
    getUserByEmail: async (data) => {
      const user = await db.select().from(users).where(eq(users.email, data));
      return user[0] ?? null;
    },
    createSession: async (data) => {
      await db.insert(sessions).values(data);

      const session = await db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, data.sessionToken));
      return session[0]!;
    },
    getSessionAndUser: async (data) => {
      const sessionAndUser = await db
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, data))
        .innerJoin(users, eq(users.id, sessions.userId));

      return sessionAndUser[0] ?? null;
    },
    updateUser: async (data) => {
      if (!data.id) {
        throw new Error("No user id.");
      }

      await db.update(users).set(data).where(eq(users.id, data.id));

      const user = await db.select().from(users).where(eq(users.id, data.id));
      return user[0]!;
    },
    updateSession: async (data) => {
      await db
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken));

      return db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .then((res) => res[0]);
    },
    linkAccount: async (rawAccount) => {
      await db
        .insert(accounts)
        .values(rawAccount)
        .then((res) => res.rows[0]);
    },
    getUserByAccount: async (account) => {
      const dbAccount = await db
        .select()
        .from(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider)
          )
        )
        .leftJoin(users, eq(accounts.userId, users.id))
        .then((res) => res[0]);

      return dbAccount?.users ?? null;
    },
    deleteSession: async (sessionToken) => {
      await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
    },
    createVerificationToken: async (token) => {
      await db.insert(verificationTokens).values(token);

      return db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.identifier, token.identifier))
        .then((res) => res[0]);
    },
    useVerificationToken: async (token) => {
      try {
        const deletedToken =
          (await db
            .select()
            .from(verificationTokens)
            .where(
              and(
                eq(verificationTokens.identifier, token.identifier),
                eq(verificationTokens.token, token.token)
              )
            )
            .then((res) => res[0])) ?? null;

        await db
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, token.identifier),
              eq(verificationTokens.token, token.token)
            )
          );

        return deletedToken;
      } catch (err) {
        throw new Error("No verification token found.");
      }
    },
    deleteUser: async (id) => {
      await Promise.all([
        db.delete(users).where(eq(users.id, id)),
        db.delete(sessions).where(eq(sessions.userId, id)),
        db.delete(accounts).where(eq(accounts.userId, id)),
      ]);

      return null;
    },
    unlinkAccount: async (account) => {
      await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider)
          )
        );

      return undefined;
    },
  };
}
