import MainCard from "@/components/mainCard";
import MainDay from "@/components/mainDay";
import QuestionCard from "@/components/questionCard";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { questions, users } from "@/lib/db/schema";
import { ssQuestions, ssTopics } from "@/static/striverSheet";
import { and, asc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
type Props = {
  params: { [key: string]: string };
};

export type questionInfoForDay = {
  questionNumber: number;
  solved: "SOLVED" | "UNATTEMPTED" | "REMINDER";
  questionTitle: string;
  leetCodeLink: string;
  youTubeLink: string | undefined;
  codingNinja: string;
  questionDay: number;
};
export default async function DayPage({ params }: Props) {
  const { day } = params;
  const session = await getServerSession(authOption);
  if (!session || !session.user || !session.user.id) {
    redirect("/");
  }

  const matches = day.match(/day-(\d+)/);
  if (!matches || !matches[1]) {
    redirect("/");
  }
  const topicNumber = parseInt(matches[1]); //i am using 1 base indexing in urls
  if (isNaN(topicNumber) || topicNumber > 27) {
    redirect("/");
  }
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));
  if (!user) {
    throw new Error("account deleted");
  }
  const topicTitle = ssTopics[topicNumber - 1];
  const databaseQuestionSet = await db
    .select()
    .from(questions)
    .where(
      and(
        eq(questions.sheet_id, user.striver_sheet_id_30_days),
        eq(questions.question_day_in_sheet, topicNumber)
      )
    )
    .orderBy(asc(questions.number));
  const questionsOfThisTopic = ssQuestions.filter(
    (questions) => questions.topicNo == topicNumber - 1
  );
  const total = questionsOfThisTopic.length;
  let databaseIndex = 0;
  let reminderCount = 0;
  let solvedCount = 0;
  const questionSet = questionsOfThisTopic.map<questionInfoForDay>(
    (staticQuestionInfo) => {
      const staticIndex = staticQuestionInfo.checkbox.match(/ques_(\d+)/)?.[1];
      if (!staticIndex) {
        throw Error("Data Inconsistency");
      }
      let databaseQuestionInfo = {};

      if (
        databaseQuestionSet.length &&
        databaseIndex < databaseQuestionSet.length &&
        databaseQuestionSet[databaseIndex]["number"] === parseInt(staticIndex)
      ) {
        const questionTitle = databaseQuestionSet[databaseIndex]["title"];
        const solved = databaseQuestionSet[databaseIndex]["solved"];

        if (solved === "REMINDER") {
          reminderCount++;
        }

        if (solved === "SOLVED") {
          solvedCount++;
        }

        databaseIndex++;
        databaseQuestionInfo = {
          solved,
          questionTitle: questionTitle,
        };
      }
      const ques_number = staticQuestionInfo.checkbox.match(/ques_(\d+)/)?.[1];
      if (!ques_number) {
        redirect("/");
      }
      return {
        questionTitle: staticQuestionInfo.problem,
        solved: "UNATTEMPTED",
        leetCodeLink: staticQuestionInfo.leetCode,
        youTubeLink: staticQuestionInfo.videoSolution,
        codingNinja: staticQuestionInfo.codingNinja,
        questionNumber: parseInt(ques_number),
        questionDay: topicNumber,
        ...databaseQuestionInfo,
      };
    }
  );

  return (
    <MainDay
      questionSet={questionSet}
      topicTitle={topicTitle}
      total={total}
      solvedCount={solvedCount}
    />
  );
}
