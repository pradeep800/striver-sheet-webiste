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
import { Loader, Youtube } from "lucide-react";
import { MouseEvent, SetStateAction, startTransition, useState } from "react";
import { absoluteUrl } from "@/lib/utils";
import { saveQuestionInfo } from "@/server-action/saveQuestionInfo";
import { questionInfoForDay } from "@/app/(general)/dashboard/[day]/page";
import { solved } from "@/types/general";
import { toast } from "./ui/use-toast";

type Props = {
  onYoutube?: boolean;
  className?: string;
  setOptimisticQuestion: (action: solved) => void;

  setSolvedCount?: React.Dispatch<SetStateAction<number>>;
  setReminderCount?: React.Dispatch<SetStateAction<number>>;
  optimisticQuestion: questionInfoForDay;
};

export default function QuestionLinks({
  onYoutube = true,
  setOptimisticQuestion,
  //not for full page question only for day page
  setSolvedCount,
  setReminderCount,
  optimisticQuestion,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  function stopPropagation(
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) {
    e.stopPropagation();
  }

  return (
    <>
      <div className="flex gap-3 " onClick={(e) => {}}>
        <StickyNotesLink id={optimisticQuestion.questionNumber} />
        {optimisticQuestion.codingNinja && (
          <Link
            className="hover:fill-red-400 fill-red-500"
            onClick={stopPropagation}
            target="_blank"
            href={absoluteUrl(
              `/countingLinks/${optimisticQuestion.questionNumber}-1`
            )}
          >
            <CodingNinjaSvg className="w-[30px] h-[30px]" />
          </Link>
        )}
        {optimisticQuestion.leetCodeLink && (
          <Link
            className="hover:fill-red-400 fill-red-500"
            onClick={stopPropagation}
            target="_blank"
            href={absoluteUrl(
              `/countingLinks/${optimisticQuestion.questionNumber}-2`
            )}
          >
            <LeetCode className="w-[30px] h-[30px]" />
          </Link>
        )}

        {optimisticQuestion.youTubeLink && onYoutube && (
          <Link
            className={"hover:text-red-400 text-red-500"}
            onClick={stopPropagation}
            target="_blank"
            href={optimisticQuestion.youTubeLink}
          >
            <Youtube className="w-[30px] h-[30px]" />
          </Link>
        )}
      </div>
      <div
        className="w-[150px] justify-center flex h-[40px]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {!loading ? (
          <Select
            open={open}
            onOpenChange={() => {
              setTimeout(() => setOpen(!open), 100);
            }}
            value={optimisticQuestion.solved}
            onValueChange={async (e) => {
              const solved = e.valueOf() as solved;
              setLoading(true);

              try {
                await saveQuestionInfo({
                  name: optimisticQuestion.questionTitle,
                  questionNumber: optimisticQuestion.questionNumber,
                  questionDay: optimisticQuestion.questionDay,
                  solved: solved,
                });
                if (setSolvedCount) {
                  if (
                    optimisticQuestion.solved === "SOLVED" &&
                    solved !== "SOLVED"
                  ) {
                    setSolvedCount((c) => c - 1);
                  }
                  if (
                    optimisticQuestion.solved !== "SOLVED" &&
                    solved === "SOLVED"
                  ) {
                    setSolvedCount((c) => c + 1);
                  }
                }
                setOptimisticQuestion(solved);
              } catch (err) {
                const error = err as Error;
                toast({
                  title: "Unable To Update",
                  description:
                    "After again trying if it doesn't work please report.",
                  variant: "destructive",
                });

                console.log(error.message);
              } finally {
                setLoading(false);
              }
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="UNATTEMPTED" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="UNATTEMPTED">UNATTEMPTED</SelectItem>
              <SelectItem value="SOLVED">SOLVED</SelectItem>
              <SelectItem value="REMINDER">REMINDER</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Loader className="animate-spin" />
        )}
      </div>
    </>
  );
}
