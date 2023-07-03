import MainCard from "@/components/mainCard";
import TopicCard from "@/components/topicCard";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { questions, users } from "@/lib/db/schema";
import { ssTopics } from "@/static/striverSheet";
import { and, asc, eq, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOption);
  if (!session) {
    //not going to happen but for typescriopt
    redirect("/");
  }
  const uUser = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));
  if (!uUser) {
    //not going to happen but for typescript
    redirect("/");
  }
  const [user] = uUser;
  const solvedQuestionsCount = await db
    .select({
      count: sql`count(${questions.id})`,
      day: questions.question_day_in_sheet,
    })
    .from(questions)
    .where(
      and(
        eq(questions.sheet_id, user.striver_sheet_id_30_days),
        eq(questions.solved, "SOLVED")
      )
    )
    .groupBy(({ day }) => day)
    .orderBy(({ day }) => day);
  const reminderQuestionsCount = await db
    .select({
      count: sql`count(${questions.id})`,
      day: questions.question_day_in_sheet,
    })
    .from(questions)
    .where(
      and(
        eq(questions.sheet_id, user.striver_sheet_id_30_days),
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
      <MainCard
        title="Striver Sheet"
        total={80}
        SolvedCount={solvedCount}
        reminderCount={countReminder}
      />
      {ssTopics.map((title, i) => {
        return <TopicCard key={i} topicTitle={title} className="mt-3" />;
      })}
    </div>
  );
}
