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
import { MouseEvent, useState, useTransition } from "react";
import { absoluteUrl } from "@/lib/utils";
import { saveQuestionInfo } from "@/server-action/saveQuestionInfo";
import { questionInfoForDay } from "@/app/(general)/sheet/[day]/page";
import { solved } from "@/types/general";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import ReminderDialog from "./reminderDialog";
import { Session } from "next-auth";
type Props = {
  onYoutube?: boolean;
  className?: string;
  questionInfo: questionInfoForDay;
  userInfo: { defaultShouldSendEmail: boolean; role: Session["user"]["role"] };
};

export default function QuestionLinks({
  onYoutube = true,
  questionInfo,
  userInfo,
}: Props) {
  const [open, setOpen] = useState(false); //for work around of select /* radix ui select was not working */
  const router = useRouter();
  const [reminderClicked, setReminderClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  function stopPropagation(
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) {
    e.stopPropagation();
  }

  return (
    <>
      <div className="flex gap-3 mobile-select-removed" onClick={(e) => {}}>
        <StickyNotesLink id={questionInfo.questionNumber} />
        {questionInfo.codingNinja && (
          <Link
            className="hover:fill-red-400 fill-red-500"
            onClick={stopPropagation}
            target="_blank"
            prefetch={false}
            href={absoluteUrl(
              `/countingLinks/${questionInfo.questionNumber}-1`
            )}
          >
            <CodingNinjaSvg className="w-[30px] h-[30px]" />
            <div className="sr-only">coding ninja link</div>
          </Link>
        )}
        {questionInfo.leetCodeLink && (
          <Link
            className="hover:fill-red-400 fill-red-500"
            onClick={stopPropagation}
            prefetch={false}
            target="_blank"
            href={absoluteUrl(
              `/countingLinks/${questionInfo.questionNumber}-2`
            )}
          >
            <LeetCode className="w-[30px] h-[30px]" />
            <div className="sr-only">leetcode ninja link</div>
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
            <div className="sr-only">youtube ninja link</div>
          </Link>
        )}
      </div>
      <div
        className="w-[150px] justify-center items-center flex h-[40px] "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {!(loading || isPending) ? (
          <Select
            open={open}
            onOpenChange={() => {
              setTimeout(() => setOpen(!open), 100);
            }}
            value={questionInfo.solved}
            onValueChange={async (e) => {
              setTimeout(async () => {
                const solved = e.valueOf() as solved;
                if (solved === "REMINDER") {
                  setReminderClicked(true);
                  return;
                }

                setLoading(true);
                try {
                  const actionRes = await saveQuestionInfo({
                    name: questionInfo.questionTitle,
                    questionNumber: questionInfo.questionNumber,
                    questionDay: questionInfo.questionDay,
                    solved: solved,
                  });
                  if (actionRes?.error) {
                    toast({ title: actionRes.error, variant: "destructive" });
                  } else {
                    startTransition(() => {
                      router.refresh();
                    });
                  }
                } catch (err) {
                  const error = err as Error;
                  toast({
                    title: "Please try Again",
                    variant: "destructive",
                  });

                  console.log(error.message);
                } finally {
                  setLoading(false);
                }
              }, 100);
            }}
          >
            <SelectTrigger
              className="border-2 border-slate-500 dark:border-gray-700"
              aria-label="Select from unattempted solved and reminder"
            >
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
        {/* Dialog for reminder*/}
        <ReminderDialog
          setReminderClicked={setReminderClicked}
          reminderClicked={reminderClicked}
          questionInfo={questionInfo}
          userInfo={userInfo}
        />
      </div>
    </>
  );
}
