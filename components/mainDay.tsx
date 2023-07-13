"use client";
import { questionInfoForDay } from "@/app/(general)/sheet/[day]/page";
import MainCard from "./mainCard";
import QuestionCard from "./questionCard";
import { useEffect, useState } from "react";

type Props = {
  topicTitle: string;
  total: number;
  questionSet: questionInfoForDay[];
  solvedCount: number;
  defaultShouldSendEmail: boolean;
};
export default function MainDay({
  questionSet,
  topicTitle,
  total,
  solvedCount,
  defaultShouldSendEmail,
}: Props) {
  return (
    <div className="max-w-[800px] mx-auto ">
      <MainCard title={topicTitle} total={total} solvedCount={solvedCount} />
      <div>
        {questionSet.map((question) => {
          return (
            <QuestionCard
              defaultShouldSendEmail={defaultShouldSendEmail}
              key={question.questionNumber}
              questionInfo={question}
            />
          );
        })}
      </div>
    </div>
  );
}
