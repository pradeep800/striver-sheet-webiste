"use server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { and, eq, ne } from "drizzle-orm";
import { zact } from "zact/server";
import { ChangeProfileType } from "../lib/zodType/changeProfileSchema";
import {
  LogServerAndReturnError,
  ReturnDeletedAccount,
  ReturnNoSession,
  isIdentifier,
} from "@/lib/serverActionUtils";
import { absoluteUrl } from "@/lib/utils";
import { DbUser } from "@/lib/db/types";
import { Session } from "next-auth";
import { serverSession } from "@/lib/serverSession";
export const ChangeProfile = zact(ChangeProfileType)(
  async ({ userName, description }) => {
    let session: Session | undefined;
    try {
      session = await serverSession();
      if (!session) {
        return ReturnNoSession();
      }

      //checking if username is identifier
      const identifier = isIdentifier(userName);
      if (identifier) {
        return { error: "Please choose different name" };
      }

      let userInfo: Pick<
        DbUser,
        "userName" | "leftProfileChanges" | "id" | "description"
      >;

      [userInfo] = await db
        .select({
          leftProfileChanges: users.leftProfileChanges,
          userName: users.userName,
          description: users.description,
          id: users.id,
        })
        .from(users)
        .where(eq(users.id, session.user.id))
        .limit(1);

      if (!userInfo) {
        return ReturnDeletedAccount();
      }
      if (!userInfo.leftProfileChanges) {
        return { error: `You don't have enough profile changes left` };
      }
      if (
        userInfo.userName === userName &&
        userInfo.description === description
      ) {
        return { error: `Please make changes for saving info` };
      }

      //checking if name already Exists
      const PeopleWhoHaveThisUserName = await db
        .select({ id: users.id })
        .from(users)
        .where(and(eq(users.userName, userName), ne(users.id, userInfo.id)))
        .limit(1);
      if (PeopleWhoHaveThisUserName.length) {
        return {
          error: "User already exits with this name",
        };
      }

      await db
        .update(users)
        .set({
          userName,
          description,
          leftProfileChanges: userInfo.leftProfileChanges - 1,
        })
        .where(eq(users.id, session.user.id));
    } catch (err) {
      return LogServerAndReturnError("changeProfile", err, session);
    }
  }
);
