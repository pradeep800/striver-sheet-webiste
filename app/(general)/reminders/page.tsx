import MainReminder from "@/components/mainReminders";
import { parseDaysAndReminders } from "@/components/pagesUtils";
import { db } from "@/lib/db";
import { questions, reminders, users } from "@/lib/db/schema";
import { serverSession } from "@/lib/serverSession";
import { maxQuestionsInReminderPage } from "@/static/infiniteScrolling";
import { and, eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

type Props = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};
export type DbQuestionInfo = {
  questionNo: number;
  questionDay: number;
  mailSended: boolean;
  shouldSendMail: boolean;
};
export type DaysAndItsQuestions = Record<string, DbQuestionInfo[]>[];

export default async function ReminderPage({ searchParams }: Props) {
  const session = await serverSession();
  if (!session) {
    redirect("/");
  }
  const [userInfo] = await db
    .select({
      sheetId: users.striver_sheet_id_30_days,
      id: users.id,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);
  if (!userInfo) {
    redirect("/accountDeleted");
  }
  const [reminderCount] = await db
    .select({ count: sql`count(${questions.sheet_id})` })
    .from(questions)
    .where(
      and(
        eq(questions.sheet_id, userInfo.sheetId),
        eq(questions.solved, "REMINDER")
      )
    );
  const totalReminders = parseInt(reminderCount.count as string);
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
    .limit(maxQuestionsInReminderPage);
  const daysAndQuestions = parseDaysAndReminders(reminderQuestions);
  return (
    <MainReminder
      daysAndQuestions={daysAndQuestions}
      totalReminders={totalReminders}
      userRole={userInfo.role}
    />
  );
}
