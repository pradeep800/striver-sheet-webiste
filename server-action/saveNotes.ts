"use server";
import { db } from "@/lib/db";
import { notes, users } from "@/lib/db/schema";
import {
  LogServerAndReturnError,
  ReturnDeletedAccount,
  ReturnNoSession,
} from "@/lib/serverActionUtils";
import { serverSession } from "@/lib/serverSession";
import { and, eq } from "drizzle-orm";
import { Session } from "next-auth";
import { zact } from "zact/server";
import { z } from "zod";

export const saveNotes = zact(
  z.object({ questionNo: z.number(), content: z.any() })
)(async (input) => {
  let session: Session | undefined;
  try {
    const session = await serverSession();
    if (!session) {
      return ReturnNoSession();
    }
    const [userInfo] = await db
      .select({ sheetId: users.striver_sheet_id_30_days })
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (!userInfo) {
      return ReturnDeletedAccount();
    }
    const [notesInfo] = await db
      .select({ id: notes.content })
      .from(notes)
      .where(
        and(
          eq(notes.sheet_id, userInfo.sheetId),
          eq(notes.question_no, input.questionNo)
        )
      )
      .limit(1);
    if (notesInfo) {
      await db
        .update(notes)
        .set({ content: input.content })
        .where(
          and(
            eq(notes.sheet_id, userInfo.sheetId),
            eq(notes.question_no, input.questionNo)
          )
        );
    } else {
      await db.insert(notes).values({
        question_no: input.questionNo,
        sheet_id: userInfo.sheetId,
        content: input.content,
      });
    }
  } catch (err) {
    return LogServerAndReturnError("saveNotes", err, session);
  }
});
