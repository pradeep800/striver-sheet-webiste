"use server";

import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import {
  LogServerAndReturn,
  ReturnDeletedAccount,
  ReturnNoSession,
} from "@/lib/serverActionUtils";
import { serverSession } from "@/lib/serverSession";
import { absoluteUrl } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { Session } from "next-auth";
import { zact } from "zact/server";

export const deleteAccount = zact()(async () => {
  let session: Session | undefined;
  try {
    session = await serverSession();
    if (!session) {
      return ReturnNoSession();
    }
    const userId = session.user.id;

    const [userInfo] = await db
      .select({
        sheeId: schema.users.striver_sheet_id_30_days,
        email: schema.users.email,
      })
      .from(schema.users)
      .where(eq(schema.users.id, userId))
      .limit(1);
    if (!userInfo) {
      return ReturnDeletedAccount();
    }

    const sheetId = userInfo.sheeId as string;
    //at point of time promise.all was not working
    await db.transaction(async (tx) => {
      try {
        //delete all users
        await tx.delete(schema.users).where(eq(schema.users.id, userId));

        //delete all accounts
        await tx
          .delete(schema.accounts)
          .where(eq(schema.accounts.userId, userId));

        //delete all sessions
        await tx
          .delete(schema.sessions)
          .where(eq(schema.sessions.userId, userId));

        //delete all question solved
        await tx
          .delete(schema.questions)
          .where(eq(schema.questions.sheet_id, sheetId));

        //remove all notes
        await tx
          .delete(schema.notes)
          .where(eq(schema.questions.sheet_id, sheetId));

        ///remove all tracking questions
        await tx
          .delete(schema.trackingQuestions)
          .where(eq(schema.trackingQuestions.user_id, userId));

        //remove all verification token
        await tx
          .delete(schema.verificationTokens)
          .where(
            eq(schema.verificationTokens.identifier, userInfo.email as string)
          );

        //remove all reminders
        await tx
          .delete(schema.reminders)
          .where(eq(schema.reminders.user_id, userId));
      } catch (err) {
        const error = err as Error;
        console.log(error.message);
        await tx.rollback();
        throw new Error("Unable to Delete your Account");
      }
    });
  } catch (err) {
    return LogServerAndReturn("deleteAccount", err, session);
  }
});
