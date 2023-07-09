"use server";

import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { zact } from "zact/server";

export const deleteAccount = zact()(async () => {
  const session = await getServerSession(authOption);
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  const userId = session.user.id;

  try {
    const [userInfo] = await db
      .select({
        sheeId: schema.users.striver_sheet_id_30_days,
        email: schema.users.email,
      })
      .from(schema.users)
      .where(eq(schema.users.id, userId))
      .limit(1);
    const sheetId = userInfo.sheeId as string;
    await db.transaction(async (tx) => {
      try {
        //delete all users
        const deleteUser = await tx
          .delete(schema.users)
          .where(eq(schema.users.id, userId));

        //delete all accounts
        const deleteAccounts = await tx
          .delete(schema.accounts)
          .where(eq(schema.accounts.userId, userId));

        //delete all sessions
        const deleteSessions = await tx
          .delete(schema.sessions)
          .where(eq(schema.sessions.userId, userId));

        //delete all question solved
        const deleteQuestions = await tx
          .delete(schema.questions)
          .where(eq(schema.questions.sheet_id, sheetId));

        ///remove all tracking questions
        const deleteTrackingQuestions = await tx
          .delete(schema.trackingQuestions)
          .where(eq(schema.trackingQuestions.userId, userId));

        //remove all verification token
        const deleteVerificationTokens = await tx
          .delete(schema.verificationTokens)
          .where(
            eq(schema.verificationTokens.identifier, userInfo.email as string)
          );

        //remove all reminders
        const deleteReminders = await tx
          .delete(schema.reminders)
          .where(eq(schema.reminders.user_id, userId));

        // await Promise.all([
        //   deleteReminders,
        //   deleteVerificationTokens,
        //   deleteTrackingQuestions,
        //   deleteQuestions,
        //   deleteSessions,
        //   deleteAccounts,
        //   deleteUser,
        // ]);
      } catch (err) {
        const error = err as Error;
        console.log(error.message);
        await tx.rollback();
        throw new Error("Unable to Delete your Account");
      }
    });
  } catch (err) {
    const error = err as Error;
    throw new Error("Unable to delete your account");
  }
});
