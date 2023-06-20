import MainCard from "@/components/mainCard";
import QuestionCard from "@/components/questionCard";
import { db } from "@/lib/db";
import { questions } from "@/lib/db/schema";
import { ssQuestions, ssTopics } from "@/static/striverSheet";
import { asc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type Props = {
  params: { [key: string]: string };
};

export type questionInfoType = {
  questionNumber: number;
  solved: "SOLVED" | "UNATTEMPTED" | "REMINDER";
  questionTitle: string;
  leetCodeLink: string;
  youTubeLink: string | undefined;
  codingNinja: string;
};

export default async function DayPage({ params }: Props) {
  const { day } = params;

  const matches = day.match(/day-(\d+)/);
  if (!matches || !matches[1]) {
    redirect("/");
  }
  const topicNumber = parseInt(matches[1]) - 1; //i am using 1 base indexing in urls
  if (isNaN(topicNumber) || topicNumber > 27) {
    redirect("/");
  }
  const topicTitle = ssTopics[topicNumber];
  const databaseQuestionSet = await db
    .select()
    .from(questions)
    .where(eq(questions.question_day_in_sheet, topicNumber)) //using 0 base indexing
    .orderBy(asc(questions.number));

  const questionsOfThisTopic = ssQuestions.filter(
    (questions) => questions.topicNo == topicNumber
  );
  let databaseIndex = 0;
  let reminderCount = 0;
  let solvedCount = 0;

  const questionSet = questionsOfThisTopic.map<questionInfoType>(
    (staticQuestionInfo) => {
      const staticIndex = staticQuestionInfo.checkbox.match(/ques_(\d+)/)?.[1];
      if (!staticIndex) {
        throw Error("Data Inconsistency");
      }
      let databaseQuestionInfo = {};
      if (databaseIndex === parseInt(staticIndex)) {
        const questionTitle = databaseQuestionSet[databaseIndex]["name"];
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
        ...databaseQuestionInfo,
      };
    }
  );
  return (
    <div className="max-w-[800px] mx-auto ">
      <MainCard title={topicTitle} total={80} className="" />
      <div>
        {questionSet.map((question, index) => {
          return <QuestionCard key={index} questionInfo={question} />;
        })}
      </div>
    </div>
  );
}
