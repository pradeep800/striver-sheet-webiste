import MainQuestion from "@/components/mainQuestion";
import QuestionLinks from "@/components/questionLinks";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { questions, users } from "@/lib/db/schema";

import { ssQuestions, ssTopics } from "@/static/striverSheet";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { questionInfoForDay } from "../page";

type Props = {
  params: { [key: string]: string };
};
export default async function QuestionPage({ params }: Props) {
  const { question: questionIndex, day } = params;
  const matches = day.match(/day-(\d+)/);
  if (!matches || !matches[1]) {
    throw Error("Unable to find topic Number");
  }
  const topicNumber = parseInt(matches[1]); //i am using 1 base indexing in urls
  if (isNaN(topicNumber) || topicNumber > 27) {
    throw Error("Unable To find the topic");
  }

  const questionIndexInNumber = parseInt(questionIndex);
  const question = ssQuestions[questionIndexInNumber - 1];

  if (question.topicNo + 1 !== topicNumber) {
    throw Error("Unable To find Page");
  }

  if (
    questionIndexInNumber > 191 ||
    questionIndexInNumber <= 0 ||
    isNaN(questionIndexInNumber)
  ) {
    throw Error("Unable to find question");
  }
  const session = await getServerSession(authOption);
  if (!session || !session.user || !session.user.id) {
    redirect("/");
  }
  const [userInfo] = await db
    .select({ striver_sheet_id_30_days: users.striver_sheet_id_30_days })
    .from(users)
    .where(eq(users.id, session.user.id));
  if (!userInfo) {
    throw new Error("account deleted");
  }
  const [questionInfo] = await db
    .select()
    .from(questions)
    .where(
      and(
        eq(questions.sheet_id, userInfo.striver_sheet_id_30_days),
        eq(questions.number, questionIndexInNumber)
      )
    );
  const neededQuestionInfo: questionInfoForDay = {
    codingNinja: question.codingNinja,
    leetCodeLink: question.leetCode,
    questionNumber: questionIndexInNumber,
    questionTitle: question.problem,
    solved: questionInfo?.solved ?? "UNATTEMPTED",
    youTubeLink: question?.videoSolution,
    questionDay: question.topicNo + 1,
  };
  return <MainQuestion questionInfo={neededQuestionInfo} />;
}
