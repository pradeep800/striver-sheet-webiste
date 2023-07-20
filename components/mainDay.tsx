"use client";
import { questionInfoForDay } from "@/app/(general)/sheet/[day]/page";
import MainCard from "./mainCard";
import QuestionCard from "./questionCard";
import { Session } from "next-auth";

type Props = {
  topicTitle: string;
  total: number;
  questionSet: questionInfoForDay[];
  solvedCount: number;
  userInfo: {
    defaultShouldSendEmail: boolean;
    role: Session["user"]["role"];
  };
};
export default function MainDay({
  questionSet,
  topicTitle,
  total,
  solvedCount,
  userInfo,
}: Props) {
  return (
    <div className="max-w-[800px] mx-auto ">
      <MainCard title={topicTitle} total={total} solvedCount={solvedCount} />
      <div>
        {questionSet.map((question) => {
          return (
            <QuestionCard
              userInfo={userInfo}
              key={question.questionNumber}
              questionInfo={question}
            />
          );
        })}
      </div>
    </div>
  );
}
