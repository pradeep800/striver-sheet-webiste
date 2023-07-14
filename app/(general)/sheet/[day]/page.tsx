import MainCard from "@/components/mainCard";
import MainDay from "@/components/mainDay";
import {
  getCheckBoxToQuestionNumber,
  getDayFromParams,
  getDayTitle,
} from "@/components/pagesUtils";
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

  const questionsDay = getDayFromParams(day);

  const [user] = await db
    .select({
      role: users.role,
      defaultShouldSendEmail: users.default_should_send_email,
      sheetId: users.striver_sheet_id_30_days,
    })
    .from(users)
    .where(eq(users.id, session.user.id));
  if (!user) {
    redirect("/accountDeleted");
  }
  const topicTitle = getDayTitle(questionsDay);
  const databaseQuestionSet = await db
    .select({
      title: questions.title,
      solved: questions.solved,
      number: questions.number,
    })
    .from(questions)
    .where(
      and(eq(questions.sheet_id, user.sheetId), eq(questions.day, questionsDay))
    )
    .orderBy(asc(questions.number));

  /*
   * getting all question which have are in this day
   */
  const questionsOfThisTopic = ssQuestions.filter(
    (questions) => questions.topicNo == questionsDay - 1
  );
  const total = questionsOfThisTopic.length;
  let databaseIndex = 0;
  let reminderCount = 0;
  let solvedCount = 0;
  const questionSet = questionsOfThisTopic.map<questionInfoForDay>(
    (question) => {
      const questionNumber = getCheckBoxToQuestionNumber(question.checkbox);

      let databaseQuestionInfo = {};

      if (
        databaseQuestionSet.length &&
        databaseIndex < databaseQuestionSet.length &&
        databaseQuestionSet[databaseIndex]["number"] === questionNumber
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

      return {
        questionTitle: question.problem,
        solved: "UNATTEMPTED",
        leetCodeLink: question.leetCode,
        youTubeLink: question.videoSolution,
        codingNinja: question.codingNinja,
        questionNumber: questionNumber,
        questionDay: questionsDay,
        ...databaseQuestionInfo,
      };
    }
  );

  return (
    <MainDay
      userInfo={user}
      questionSet={questionSet}
      topicTitle={topicTitle}
      total={total}
      solvedCount={solvedCount}
    />
  );
}
