"use client";

import { DaysAndItsQuestions } from "@/app/(general)/reminders/page";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getQuestionInfo,
  parseDaysAndReminders,
  sizeOfDaysAndReminders,
} from "./pagesUtils";
import Loading from "./svg/loading";
import { getReminders } from "@/server-action/getReminders";
import { toast } from "./ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { absoluteUrl } from "@/lib/utils";
type Props = {
  daysAndQuestions: DaysAndItsQuestions;
  totalReminders: number;
};
export default function MainReminder({
  totalReminders,
  daysAndQuestions,
}: Props) {
  const [loadedReminderSize, setLoadedReminderSize] = useState(() => {
    const size = sizeOfDaysAndReminders(daysAndQuestions);
    console.log(size);
    return size;
  });
  const [loadedReminders, setLoadedReminders] = useState(daysAndQuestions);
  useEffect(() => {
    setLoadedReminderSize(sizeOfDaysAndReminders(loadedReminders));
  }, [loadedReminders]);
  const fetchMore = async () => {
    const newReminders = await getReminders({ offset: loadedReminderSize });

    if ("error" in newReminders) {
      toast({ title: newReminders.error, variant: "destructive" });
    } else {
      console.log("loadedreminders");
      console.log(loadedReminders);
      const nextReminders = parseDaysAndReminders(
        newReminders,
        loadedReminders
      );

      // setLoadedReminders(nextReminders);
    }
  };

  const reminderEle = loadedReminders
    .map((reminders) => {
      const nodes: React.ReactNode[] = [];
      const reminderDay = Object.keys(reminders)[0];
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
            <Card>
              <CardHeader>
                <CardTitle>{question.problem}</CardTitle>
              </CardHeader>
              <CardContent>
                <div>hello there</div>
              </CardContent>
            </Card>
          </Link>
        );
      }
      return nodes;
    })
    .flat();
  console.log(loadedReminders);
  return (
    <div className="w-[800px] mx-auto">
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
        {reminderEle}
      </InfiniteScroll>
    </div>
  );
}
