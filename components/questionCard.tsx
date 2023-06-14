"use client";
import { StickyNote, Youtube } from "lucide-react";
import { Card, CardTitle } from "./ui/card";
import LeetCode from "./svg/leetCode";
import CodingNinjaSvg from "./svg/codingNinja";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { absoluteUrl } from "@/lib/utils";
import { MouseEvent } from "react";
type Props = {
  questionInfo: {
    questionNumber: number;
    solved: string;
    questionTitle: string;
    leetCodeLink: string;
    youTubeLink: string | undefined;
    codingNinja: string;
  };
};
export default function QuestionCard({ questionInfo }: Props) {
  const path = usePathname();
  const router = useRouter();
  function stopPropagation(
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) {
    e.stopPropagation();
  }
  return (
    <Card
      className="mt-3 "
      onClick={(e) => {
        if (questionInfo.youTubeLink) {
          router.push(absoluteUrl(`/${path}/${questionInfo.questionNumber}`));
        }
      }}
    >
      <CardTitle className="flex justify-between items-center p-2 flex-col sm:flex-row gap-4 ">
        <div className="w-[300px] text-center sm:text-left">
          {questionInfo.questionTitle}
        </div>
        <div className="flex gap-3 ">
          <Link
            className="hover:text-red-400 text-red-500"
            onClick={stopPropagation}
            href={absoluteUrl(`/${path}/notes/3`)}
          >
            <StickyNote className="w-[30px] h-[30px]" />
          </Link>
          <Link
            className="hover:fill-red-400 fill-red-500"
            onClick={stopPropagation}
            target="_blank"
            href={questionInfo.codingNinja}
          >
            <CodingNinjaSvg className="w-[30px] h-[30px]" />
          </Link>
          <Link
            className="hover:fill-red-400 fill-red-500"
            onClick={stopPropagation}
            target="_blank"
            href={questionInfo.leetCodeLink}
          >
            <LeetCode className="w-[30px] h-[30px]" />
          </Link>
          {questionInfo.youTubeLink && (
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
        <div onClick={(e) => e.stopPropagation()}>
          <Select onValueChange={async (e) => {}}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="UNATTEMPTED" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UNATTEMPTED">UNATTEMPTED</SelectItem>
              <SelectItem value="SOLVED">SOLVED</SelectItem>
              <SelectItem value="REMINDER">REMINDER</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardTitle>
    </Card>
  );
}
