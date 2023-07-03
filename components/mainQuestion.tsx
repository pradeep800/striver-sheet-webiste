"use client";
import { questionInfoForDay } from "@/app/(general)/dashboard/[day]/page";
import { solved } from "@/types/general";
import React, {
  SetStateAction,
  experimental_useOptimistic as useOptimistic,
} from "react";
import QuestionLinks from "./questionLinks";
type Props = {
  questionInfo: questionInfoForDay;
};
export default function MainQuestion({ questionInfo }: Props) {
  const [optimisticQuestion, setOptimisticQuestion] = useOptimistic(
    questionInfo,
    (state, solved: solved) => {
      return { ...state, solved };
    }
  );
  return (
    <div className="max-w-[800px] mx-auto mt-3 flex items-center h-[70vh] sm:h-[80vh]">
      <div className="w-[100%] ">
        <h1 className="text-2xl font-bold text-center text-red-500 mb-4">
          {questionInfo.questionTitle}
        </h1>
        <div className="max-w-[700px] aspect-video">
          <iframe
            className="w-[100%] h-[100%] "
            src={questionInfo.youTubeLink}
            allowFullScreen={true}
          />
        </div>
        <div className="flex gap-3 mt-3 w-[100%] justify-center">
          <QuestionLinks
            optimisticQuestion={optimisticQuestion}
            setOptimisticQuestion={setOptimisticQuestion}
            onYoutube={false}
          />
        </div>
      </div>
    </div>
  );
}
