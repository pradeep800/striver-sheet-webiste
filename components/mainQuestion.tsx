"use client";
import { questionInfoForDay } from "@/app/(general)/sheet/[day]/page";
import React, {
  useEffect,
  experimental_useOptimistic as useOptimistic,
  useState,
} from "react";
import QuestionLinks from "./questionLinks";
import { Session } from "next-auth";
type Props = {
  questionInfo: questionInfoForDay;
  userInfo: {
    defaultShouldSendEmail: boolean;
    role: Session["user"]["role"];
  };
};
export default function MainQuestion({ questionInfo, userInfo }: Props) {
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
            questionInfo={questionInfo}
            onYoutube={false}
            userInfo={userInfo}
          />
        </div>
      </div>
    </div>
  );
}
