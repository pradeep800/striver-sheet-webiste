"use client";

import { DaysAndItsQuestions } from "@/app/(general)/reminders/page";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getQuestionInfo,
  parseDaysAndReminders,
  sizeOfDaysAndReminders,
} from "./pagesUtils";
import Loading from "./svg/loading";
import { getReminders } from "@/server-action/getReminders";
import { toast } from "./ui/use-toast";
import Link from "next/link";
import { absoluteUrl } from "@/lib/utils";
import { Session } from "next-auth";
import { MailCheck, MailQuestion, MailX } from "lucide-react";
import { NToolTip } from "./tooltip";
type Props = {
  daysAndQuestions: DaysAndItsQuestions;
  totalReminders: number;
  userRole: Session["user"]["role"];
};
export default function MainReminder({
  totalReminders,
  daysAndQuestions,
  userRole,
}: Props) {
  const [loadedReminderSize, setLoadedReminderSize] = useState(() => {
    const size = sizeOfDaysAndReminders(daysAndQuestions);
    return size;
  });
  const [loadedReminders, setLoadedReminders] = useState(daysAndQuestions);

  const fetchMore = async () => {
    const newReminders = await getReminders({ offset: loadedReminderSize });
    if ("error" in newReminders) {
      toast({ title: newReminders.error, variant: "destructive" });
    } else {
      const allReminders = parseDaysAndReminders(newReminders, loadedReminders);
      const size = sizeOfDaysAndReminders(allReminders);
      setLoadedReminderSize(size);
      setLoadedReminders(allReminders);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto">
      {loadedReminderSize == 0 && (
        <div className="h-[80vh] w-full flex justify-center items-center">
          No Reminder
        </div>
      )}
      <InfiniteScroll
        next={fetchMore}
        dataLength={loadedReminderSize}
        hasMore={loadedReminderSize !== totalReminders}
        loader={
          <div className="mx-auto w-[20px] my-3">
            <Loading />
          </div>
        }
      >
        {loadedReminders.map((reminders, i) => {
          const nodes: React.ReactNode[] = [];
          const reminderDay = Object.keys(reminders)[0];
          nodes.push(
            <div
              className="flex justify-between items-center mt-4 mb-2 "
              key={crypto.randomUUID().toString()}
            >
              <span className="h-[2px] bg-black grow-[1] dark:bg-white " />
              <span className="px-3 my-3 dark:text-white">{reminderDay}</span>
              <span className="h-[2px] bg-black grow-[1] dark:bg-white" />
            </div>
          );
          for (let i = 0; i < reminders[reminderDay].length; i++) {
            const currentReminder = reminders[reminderDay][i];
            const question = getQuestionInfo(currentReminder.questionNo);
            let currentReminderUrl = `/sheet/day-${currentReminder.questionDay}`;
            if (question?.videoSolution) {
              currentReminderUrl += `/${currentReminder.questionNo}`;
            }

            nodes.push(
              <Link
                href={absoluteUrl(currentReminderUrl)}
                key={currentReminder.questionNo}
              >
                <div className="m-2 border hover:bg-slate-200 dark:bg-gray-600 dark:hover:bg-gray-500 flex justify-between p-4 items-center rounded-md dark:text-white shadow-sm">
                  <div className="text-lg font-semibold">
                    {question.problem}
                  </div>
                  <div className="">
                    {(userRole === "PROUSER" || userRole === "ADMIN") &&
                    currentReminder.shouldSendMail ? (
                      currentReminder.mailSended ? (
                        <NToolTip description="Mail Sended">
                          <MailCheck
                            className="min-w-[30px] "
                            aria-label="Icon for mail is sended"
                          />
                        </NToolTip>
                      ) : (
                        <NToolTip description="In Process">
                          <MailQuestion
                            className="min-w-[30px] "
                            aria-label="Icon for mail is going to be sended"
                          />
                        </NToolTip>
                      )
                    ) : (
                      <NToolTip description="No Email Reminder Set">
                        <MailX
                          className="min-w-[30px] "
                          aria-label="Icon for no email reminder set"
                        />
                      </NToolTip>
                    )}
                  </div>
                </div>
              </Link>
            );
          }
          return nodes;
        })}
      </InfiniteScroll>
    </div>
  );
}
