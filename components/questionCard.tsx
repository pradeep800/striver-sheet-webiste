"use client";
import { usePathname, useRouter } from "next/navigation";
import { absoluteUrl } from "@/lib/utils";
import QuestionLinks from "./questionLinks";
import {
  experimental_useOptimistic as useOptimistic,
  useTransition,
} from "react";
import { questionInfoType } from "@/app/(general)/dashboard/[day]/page";
type Props = {
  questionInfo: questionInfoType;
};
export default function QuestionCard({ questionInfo }: Props) {
  const path = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // const [optimisticmessage,setOptimisticMessage]=useOptimistic(questionInfo,(state,newMessage)=>{

  // })
  return (
    <div
      className={`mt-3 border shadow-sm rounded-md ${
        questionInfo.youTubeLink && "cursor-pointer"
      } `}
      onClick={(e) => {
        if (questionInfo.youTubeLink) {
          router.push(absoluteUrl(`/${path}/${questionInfo.questionNumber}`));
        }
      }}
    >
      <div className="flex justify-between items-center p-2 flex-col sm:flex-row gap-4 ">
        <div className="w-[300px] text-center sm:text-left  font-semibold">
          {questionInfo.questionTitle}
        </div>
        <QuestionLinks questionInfo={questionInfo} />
      </div>
    </div>
  );
}
