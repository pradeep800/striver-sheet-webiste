import MainCard from "@/components/mainCard";
import TopicCard from "@/components/topicCard";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { questions, users } from "@/lib/db/schema";
import { ssCount, ssTopics } from "@/static/striverSheet";
import { and, asc, eq, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export type CountType = {
  count: unknown;
  day: number;
};
export default async function Home() {
  const session = await getServerSession(authOption);
  if (!session) {
    //not going to happen but for typescriopt
    redirect("/");
  }
  const uUser = await db
    .select({ sheetId: users.striver_sheet_id_30_days })
    .from(users)
    .where(eq(users.id, session.user.id));

  const [user] = uUser;
  if (!user) {
    redirect("/accountDeleted");
  }
  const solvedQuestionsCount = await db
    .select({
      count: sql`count(${questions.id})`,
      day: questions.day,
    })
    .from(questions)
    .where(
      and(eq(questions.sheet_id, user.sheetId), eq(questions.solved, "SOLVED"))
    )
    .groupBy(({ day }) => day)
    .orderBy(({ day }) => day);
  const reminderQuestionsCount = await db
    .select({
      count: sql`count(${questions.id})`,
      day: questions.day,
    })
    .from(questions)
    .where(
      and(
        eq(questions.sheet_id, user.sheetId),
        eq(questions.solved, "REMINDER")
      )
    )
    .groupBy(({ day }) => day)
    .orderBy(({ day }) => day);

  //count the number of reminder and solved
  const countReminder = reminderQuestionsCount.reduce<number>(
    (total, reminder) => {
      const count = parseInt(reminder.count as string);
      return total + count;
    },
    0
  );
  const solvedCount = solvedQuestionsCount.reduce<number>((total, solved) => {
    const count = parseInt(solved.count as string);
    return total + count;
  }, 0);

  return (
    <div className="max-w-[800px] mx-auto">
      <MainCard title="Striver Sheet" total={80} solvedCount={solvedCount} />
      {ssTopics.map((title, i) => {
        const day = i + 1;
        const totalReminders = parseInt(
          reminderQuestionsCount.find((reminder) => reminder.day == day)
            ?.count as string
        );
        const totalSolved = parseInt(
          solvedQuestionsCount.find((solved) => solved.day == day)
            ?.count as string
        );
        return (
          <TopicCard
            totalReminder={totalReminders}
            totalSolved={totalSolved}
            topicDay={day}
            topicTitle={title}
            key={i}
            totalCount={ssCount[i]}
            className="mt-3"
          />
        );
      })}
    </div>
  );
}
