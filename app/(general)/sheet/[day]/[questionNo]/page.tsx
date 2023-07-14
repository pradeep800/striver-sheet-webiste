import MainQuestion from "@/components/mainQuestion";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { questions, users } from "@/lib/db/schema";

import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { questionInfoForDay } from "../page";
import {
  checkQuestionInfoIsCorrect,
  getDayFromParams,
  getQuestionInfo,
} from "@/components/pagesUtils";

type Props = {
  params: { [key: string]: string };
};
export default async function QuestionPage({ params }: Props) {
  const { questionNo: questionNumberInString, day } = params;

  const questionDay = getDayFromParams(day);
  const questionNumber = parseInt(questionNumberInString);
  checkQuestionInfoIsCorrect(questionDay, questionNumber);
  checkQuestionInfoIsCorrect(questionDay, questionNumber);
  const question = getQuestionInfo(questionNumber);

  const session = await getServerSession(authOption);
  if (!session || !session.user || !session.user.id) {
    redirect("/");
  }
  const [userInfo] = await db
    .select({
      role: users.role,
      sheetId: users.striver_sheet_id_30_days,
      defaultShouldSendEmail: users.default_should_send_email,
    })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);
  if (!userInfo) {
    redirect("/accountDeleted");
  }
  const [questionInfo] = await db
    .select({ solved: questions.solved })
    .from(questions)
    .where(
      and(
        eq(questions.sheet_id, userInfo.sheetId),
        eq(questions.number, questionNumber)
      )
    )
    .limit(1);
  const neededQuestionInfo: questionInfoForDay = {
    codingNinja: question.codingNinja,
    leetCodeLink: question.leetCode,
    questionNumber: questionNumber,
    questionTitle: question.problem,
    solved: questionInfo?.solved ?? "UNATTEMPTED",
    youTubeLink: question?.videoSolution,
    questionDay: question.topicNo + 1,
  };
  return <MainQuestion questionInfo={neededQuestionInfo} userInfo={userInfo} />;
}
