"use server";
import { maxQuestions } from "@/app/(general)/reminders/page";
import { parseDaysAndReminders } from "@/components/pagesUtils";
import { db } from "@/lib/db";
import { questions, reminders, users } from "@/lib/db/schema";
import {
  LogServerAndReturn,
  ReturnDeletedAccount,
  ReturnNoSession,
} from "@/lib/serverActionUtils";
import { serverSession } from "@/lib/serverSession";
import { and, eq } from "drizzle-orm";
import { Session } from "next-auth";
import { zact } from "zact/server";
import { z } from "zod";

export const getReminders = zact(z.object({ offset: z.number() }))(
  async (input) => {
    let session: Session | undefined;
    try {
      session = await serverSession();
      if (!session) {
        return ReturnNoSession();
      }
      const [userInfo] = await db
        .select({ sheetId: users.striver_sheet_id_30_days, id: users.id })
        .from(users)
        .where(eq(users.id, session.user.id))
        .limit(1);
      if (!userInfo) {
        return ReturnDeletedAccount();
      }

      const reminderQuestions = await db
        .select({
          questionNo: questions.number,
          questionDay: questions.day,
          remindersDueDate: reminders.due_date,
          mailSended: reminders.mail_sended,
          shouldSendMail: reminders.should_send_mail,
        })
        .from(questions)
        .innerJoin(reminders, eq(questions.number, reminders.question_no))
        .orderBy(reminders.due_date)
        .where(
          and(
            eq(questions.sheet_id, userInfo.sheetId),
            eq(questions.solved, "REMINDER")
          )
        )
        .limit(maxQuestions)
        .offset(input.offset);

      return reminderQuestions;
    } catch (err) {
      return LogServerAndReturn("getReminders", err, session);
    }
  }
);
