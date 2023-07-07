"use client";

import { questionInfoForDay } from "@/app/(general)/sheet/[day]/page";
import MainCard from "./mainCard";
import QuestionCard from "./questionCard";
import { useState } from "react";

type Props = {
  topicTitle: string;
  total: number;
  questionSet: questionInfoForDay[];
  reminderCount: number;
  solvedCount: number;
};
export default function MainDay({
  questionSet,
  topicTitle,
  total,
  reminderCount,
  solvedCount,
}: Props) {
  const [reminderC, setReminderC] = useState(reminderCount);
  const [solvedC, setSolvedC] = useState(solvedCount);
  return (
    <div className="max-w-[800px] mx-auto ">
      <MainCard
        title={topicTitle}
        total={total}
        SolvedCount={solvedC}
        reminderCount={reminderC}
      />
      <div>
        {questionSet.map((question, index) => {
          return (
            <QuestionCard
              key={question.questionNumber}
              questionInfo={question}
              solvedCount={solvedC}
              reminderCount={reminderCount}
              setReminderCount={setReminderC}
              setSolvedCount={setSolvedC}
            />
          );
        })}
      </div>
    </div>
  );
}
