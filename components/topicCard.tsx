"use client";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ssQuestions, ssTopics } from "@/static/striverSheet";
import { CountType } from "@/app/(general)/dashboard/page";
type Props = {
  topicTitle: string;
  className?: string;
  totalSolveDay: CountType | undefined;
  totalReminderDay: CountType | undefined;
  totalCount: number;
  topicDay: number;
};
export default function TopicCard({
  topicTitle,
  className,
  totalCount,
  totalReminderDay,
  totalSolveDay,
  topicDay,
}: Props) {
  const [reminderProgress, setReminderProgress] = useState(0);
  const [solvedProgress, setSolvedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (totalReminderDay) {
        const solvedPer = parseInt(
          (
            (parseInt(totalReminderDay.count as string) / totalCount) *
            100
          ).toFixed(2)
        );
        setReminderProgress(solvedPer);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (totalSolveDay) {
        const solvedPer = parseInt(
          (
            (parseInt(totalSolveDay.count as string) / totalCount) *
            100
          ).toFixed(2)
        );
        setSolvedProgress(solvedPer);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link href={`/dashboard/day-${topicDay}`}>
      <Card className={`${className} `}>
        <CardHeader>
          <CardTitle className="">
            Day {topicDay} {topicTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex  gap-4 flex-col sm:flex-row">
            <div className="flex flex-col gap-2 grow-[1] font-semibold">
              <div>Solved Question</div>
              <div className="flex items-center gap-3">
                <Progress value={solvedProgress} />
              </div>
              <div className="flex justify-between">
                <p>
                  {(totalSolveDay?.count as number) ?? 0}/{totalCount}
                </p>
                <p>{solvedProgress}%</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 grow-[1] font-semibold">
              <div>Reminders</div>
              <div className="flex items-center gap-3">
                <Progress value={reminderProgress} />
              </div>
              <div className="flex justify-between">
                <p>
                  {(totalReminderDay?.count as number) ?? 0}/{totalCount}
                </p>
                <p>{reminderProgress}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
