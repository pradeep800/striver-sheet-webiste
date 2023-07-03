"use client";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import StickyNotesLink from "./stickyNotesLink";
import LeetCode from "./svg/leetCode";
import CodingNinjaSvg from "./svg/codingNinja";
import { Youtube } from "lucide-react";
import { MouseEvent, startTransition } from "react";
import { absoluteUrl } from "@/lib/utils";
import { saveQuestionInfo } from "@/server-action/saveQuestionInfo";
import { questionInfoType } from "@/app/(general)/dashboard/[day]/page";

type Props = {
  questionInfo: questionInfoType;
  onYoutube?: boolean;
  className?: string;
};

export default function QuestionLinks({
  questionInfo,
  onYoutube = true,
}: Props) {
  function stopPropagation(
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) {
    e.stopPropagation();
  }

  return (
    <>
      <div className="flex gap-3 " onClick={(e) => {}}>
        <StickyNotesLink id={questionInfo.questionNumber} />
        {questionInfo.codingNinja && (
          <Link
            className="hover:fill-red-400 fill-red-500"
            onClick={stopPropagation}
            target="_blank"
            href={absoluteUrl(
              `/countingLinks/${questionInfo.questionNumber}-1`
            )}
          >
            <CodingNinjaSvg className="w-[30px] h-[30px]" />
          </Link>
        )}
        {questionInfo.leetCodeLink && (
          <Link
            className="hover:fill-red-400 fill-red-500"
            onClick={stopPropagation}
            target="_blank"
            href={absoluteUrl(
              `/countingLinks/${questionInfo.questionNumber}-2`
            )}
          >
            <LeetCode className="w-[30px] h-[30px]" />
          </Link>
        )}

        {questionInfo.youTubeLink && onYoutube && (
          <Link
            className={"hover:text-red-400 text-red-500"}
            onClick={stopPropagation}
            target="_blank"
            href={questionInfo.youTubeLink}
          >
            <Youtube className="w-[30px] h-[30px]" />
          </Link>
        )}
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Select
          value={questionInfo.solved}
          onValueChange={async (e) => {
            await saveQuestionInfo({
              name: questionInfo.questionTitle,
              questionNumber: questionInfo.questionNumber,
              questionDay: questionInfo.questionDay,
              solved: e.valueOf() as typeof questionInfo.solved,
            });
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="UNATTEMPTED" />
          </SelectTrigger>
          <SelectContent className="z-[1000]">
            <SelectItem value="UNATTEMPTED">UNATTEMPTED</SelectItem>
            <SelectItem value="SOLVED">SOLVED</SelectItem>
            <SelectItem value="REMINDER">REMINDER</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
