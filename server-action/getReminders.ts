"use server";

import { db } from "@/lib/db";
import { questions, reminders, users } from "@/lib/db/schema";
import {
  LogServerAndReturnError,
  ReturnDeletedAccount,
  ReturnNoSession,
} from "@/lib/serverActionUtils";
import { serverSession } from "@/lib/serverSession";
import { maxQuestionsInReminderPage } from "@/static/infiniteScrolling";
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
        .from(reminders)
        .innerJoin(
          questions,
          and(
            eq(reminders.question_no, questions.number),
            eq(reminders.user_id, userInfo.id),
            eq(questions.sheet_id, userInfo.sheetId)
          )
        )
        .where(eq(reminders.user_id, userInfo.id))
        .orderBy(reminders.due_date)
        .limit(maxQuestionsInReminderPage)
        .offset(input.offset);
      return reminderQuestions;
    } catch (err) {
      return LogServerAndReturnError("getReminders", err, session);
    }
  }
);
