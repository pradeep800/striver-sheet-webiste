import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { reminders, users } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import EmailReminder from "@/components/emailTemplate/emailReminder";

import { ssQuestions } from "@/static/striverSheet";
import { env } from "@/env.mjs";
import { getIndianTime } from "@/lib/dateTimeFun";

const resend = new Resend(env.RESEND_API_KEY);

export async function GET(req: Request) {
  //get all admin
  const resendIds: string[] = [];
  const adminUsers = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(eq(users.role, "PROUSER"));

  //traverse through admin and send them mail
  for (let i = 0; i < adminUsers.length; i++) {
    const admin = adminUsers[i];
    //get all reminder of this admin
    const allReminderOfThisAdmin = await db
      .select({
        reminderId: reminders.id,
        questionNo: reminders.question_no,
        due_date: reminders.due_date,
      })
      .from(reminders)
      .where(
        sql`${reminders.user_id}=${admin.id} and ${
          reminders.should_send_mail
        }=${true} and ${reminders.mail_sended}=${false}`
      )
      .orderBy(reminders.question_no);

    const reminderWhichHaveTodayDate = allReminderOfThisAdmin.filter(
      (reminder) => {
        const { day: reminderDay, month: reminderMonth } = getIndianTime(
          reminder.due_date.toISOString()
        );
        const { day: todayDay, month: todayMonth } = getIndianTime(
          new Date().toISOString()
        );

        return reminderDay === todayDay && todayMonth === reminderMonth;
      }
    );

    const questionInfo = reminderWhichHaveTodayDate.map((reminderInfo) => {
      const question = ssQuestions[reminderInfo.questionNo - 1];
      return {
        questionNo: reminderInfo.questionNo,
        title: question.problem,
        day: question.topicNo + 1,
      };
    });
    if (!questionInfo.length) {
      continue;
    }

    const id = await resend.emails.send({
      from: "reminders@pradeepbisht.com",
      to: "pradeep8b0@gmail.com",
      subject: "Reminders",
      react: EmailReminder({
        questionsInfo: questionInfo,
      }),
    });
    resendIds.push(id.id);

    const markingReminderSended: any[] = [];
    //mark mail send
    reminderWhichHaveTodayDate.map((reminder) => {
      markingReminderSended.push(
        db
          .update(reminders)
          .set({ mail_sended: true })
          .where(eq(reminders.id, reminder.reminderId))
      );
    });
    await Promise.all(markingReminderSended);
  }

  return NextResponse.json({ ids: resendIds });
}
