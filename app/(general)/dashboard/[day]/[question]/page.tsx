import QuestionLinks from "@/components/questionLinks";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { questions, users } from "@/lib/db/schema";

import { ssQuestions, ssTopics } from "@/static/striverSheet";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));
  const [questionInfo] = await db
    .select()
    .from(questions)
    .where(
      and(
        eq(questions.sheet_id, userInfo.striver_sheet_id_30_days),
        eq(questions.number, questionIndexInNumber)
      )
    );

  return (
    <div className="max-w-[800px] mx-auto mt-3 flex items-center h-[70vh] sm:h-[80vh]">
      <div className="w-[100%] ">
        <h1 className="text-2xl font-bold text-center text-red-500 mb-4">
          {question.problem}
        </h1>
        <div className="max-w-[700px] aspect-video">
          <iframe
            className="w-[100%] h-[100%] "
            src={question.videoSolution}
            allowFullScreen={true}
          />
        </div>
        <div className="flex gap-3 mt-3 w-[100%] justify-center">
          <QuestionLinks
            questionInfo={{
              codingNinja: question.codingNinja,
              leetCodeLink: question.leetCode,
              questionNumber: questionIndexInNumber,
              questionTitle: question.problem,
              solved: questionInfo?.solved ?? "UNATTEMPTED",
              youTubeLink: question?.videoSolution,
              questionDay: questionIndexInNumber,
            }}
            onYoutube={false}
          />
        </div>
      </div>
    </div>
  );
}
