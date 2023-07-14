import { db } from "@/lib/db";
import { notes, users } from "@/lib/db/schema";
import { LogServerAndReturn } from "@/lib/serverActionUtils";
import { serverSession } from "@/lib/serverSession";
import { and, eq } from "drizzle-orm";
import { Session } from "next-auth";
import { zact } from "zact/server";
import { z } from "zod";

export const saveNotes = zact(
  z.object({ questionNo: z.number(), content: z.any(), sheetId: z.string() })
)(async (input) => {
  let session: Session | boolean | undefined;
  try {
    const session = await serverSession();
    if (typeof session === "boolean") {
      return { error: "You are not login" };
    }
    const [userInfo] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);
    if (!userInfo) {
      return {
        error: "Your account is deleted",
      };
    }
    const [notesInfo] = await db
      .select({ id: notes.content })
      .from(notes)
      .where(
        and(
          eq(notes.sheet_id, input.sheetId),
          eq(notes.question_no, input.questionNo)
        )
      )
      .limit(1);
    if (notesInfo) {
      await db.update(notes).set({ content: input.content });
    } else {
      await db.insert(notes).values({
        question_no: input.questionNo,
        sheet_id: input.sheetId,
        content: input.content,
      });
    }
  } catch (err) {
    return LogServerAndReturn(err, session);
  }
});
