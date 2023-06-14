import MainCard from "@/components/mainCard";
import QuestionCard from "@/components/questionCard";
import { db } from "@/lib/db";
import { questions } from "@/lib/db/schema";
import { ssRelation, striverSheetData } from "@/static/striverSheet";
import axios from "axios";
import { asc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type Props = {
  params: { [key: string]: string };
};
export default async function DayPage({ params }: Props) {
  const { day } = params;

  const matches = day.match(/day-(\d+)/);
  if (!matches || !matches[1]) {
    redirect("/");
  }
  const dayNumber = parseInt(matches[1]);
  if (isNaN(dayNumber) || dayNumber > 27) {
    redirect("/");
  }
  const [questionSetTitle] = Object.keys(ssRelation[dayNumber - 1]);
  const databaseQuestionSet = await db
    .select()
    .from(questions)
    .where(eq(questions.question_day_in_sheet, dayNumber))
    .orderBy(asc(questions.number));

  const staticQuestionSet = striverSheetData[questionSetTitle];
  let databaseIndex = 0;
  let reminderCount = 0;
  let solvedCount = 0;

  const questionSet = staticQuestionSet.map((staticQuestionInfo) => {
    const staticIndex = staticQuestionInfo.checkbox.match(/ques_(\d+)/)?.[1];
    if (!staticIndex) {
      throw Error("Data Inconsistency");
    }
    let databaseQuestionInfo = {} as
      | {
          solved: "UNATTEMPTED" | "REMINDER" | "SOLVE";
          questionTitle: string;
        }
      | {};
    if (databaseIndex === parseInt(staticIndex)) {
      const questionTitle = databaseQuestionSet[databaseIndex]["name"];
      const solved = databaseQuestionSet[databaseIndex]["solved"];

      if (solved === "REMINDER") {
        reminderCount++;
      }

      if (solved === "SOLVE") {
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
  });
  return (
    <div className="max-w-[800px] mx-auto ">
      <MainCard title={questionSetTitle} total={80} className="" />
      <div>
        {questionSet.map((question, index) => {
          return <QuestionCard key={index} questionInfo={question} />;
        })}
      </div>
    </div>
  );
}
