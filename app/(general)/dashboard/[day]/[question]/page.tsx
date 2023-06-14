import StickyNotesLink from "@/components/stickyNotesLink";
import CodingNinjaSvg from "@/components/svg/codingNinja";
import LeetCode from "@/components/svg/leetCode";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  Select,
  SelectItem,
} from "@/components/ui/select";
import { StickyNote } from "lucide-react";
import Link from "next/link";

type Props = {
  params: { [key: string]: string };
};
export default async function QuestionPage({ params }: Props) {
  const { question } = params;
  const data = {
    checkbox: "ques_5",
    problem: "Sort an array of 0’s 1’s 2’s",
    leetCode: "https://leetcode.com/problems/sort-colors/",
    videoSolution: "https://youtube.com/embed/tp8JIuCXBaU",
    codingNinja: "https://bit.ly/3tlM60B",
  };
  return (
    <div className="max-w-[800px] mx-auto mt-3 flex items-center h-[100%] ">
      <div className="w-[100%] ">
        <h1 className="text-2xl font-bold text-center text-red-500 mb-4">
          {data.problem}
        </h1>
        <div className="max-w-[700px] aspect-video">
          <iframe
            className="w-[100%] h-[100%] "
            src={data.videoSolution}
            allowFullScreen={true}
          />
        </div>
        <div className="flex gap-3 mt-2 mx-auto w-[100%]">
          <StickyNotesLink />
          <Link
            className="hover:fill-red-400 fill-red-500"
            href={data.codingNinja}
          >
            <CodingNinjaSvg className="w-[30px] h-[30px]" />
          </Link>
          <Link
            className="hover:fill-red-400 fill-red-500"
            href={data.leetCode}
          >
            <LeetCode className="w-[30px] h-[30px]" />
          </Link>
          <Select>
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
      </div>
    </div>
  );
}
