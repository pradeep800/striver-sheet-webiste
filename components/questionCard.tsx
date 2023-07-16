"use client";
import { usePathname, useRouter } from "next/navigation";
import { absoluteUrl, cn } from "@/lib/utils";
import QuestionLinks from "./questionLinks";
import React, {
  useEffect,
  experimental_useOptimistic as useOptimistic,
  useState,
} from "react";
import { questionInfoForDay } from "@/app/(general)/sheet/[day]/page";
import clsx from "clsx";
import { Session } from "next-auth";
type Props = {
  questionInfo: questionInfoForDay;
  userInfo: {
    defaultShouldSendEmail: boolean;
    role: Session["user"]["role"];
  };
};

export default function QuestionCard({ userInfo, questionInfo }: Props) {
  const path = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn([
        "mt-3  shadow-sm rounded-md hover:bg-slate-100 dark:bg-gray-500 dark:hover:bg-gray-400 border-2 border-slate-500 dark:border-slate-600 text-black mobile-select-removed",
        questionInfo.youTubeLink ? "cursor-pointer" : "cursor-not-allowed",
        questionInfo.solved == "SOLVED" &&
          "bg-green-200 dark:bg-green-200 hover:bg-green-100 dark:text-black dark:hover:bg-green-100 border-green-500 border-2",
        questionInfo.solved === "REMINDER" &&
          "bg-red-200 dark:bg-red-200 hover:bg-red-100 dark:text-black dark:hover:bg-red-100 border-red-500 border-2",
      ])}
      onClick={(e) => {
        if (questionInfo.youTubeLink) {
          router.push(absoluteUrl(`/${path}/${questionInfo.questionNumber}`));
        }
      }}
    >
      <div
        className={clsx([
          "flex justify-between items-center p-2 flex-col sm:flex-row gap-4 ",
        ])}
      >
        <div className="w-[300px] text-center sm:text-left  font-semibold">
          {questionInfo.questionTitle}
        </div>
        <QuestionLinks questionInfo={questionInfo} userInfo={userInfo} />
      </div>
    </div>
  );
}
