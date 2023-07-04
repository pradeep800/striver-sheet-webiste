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
  totalSolved: number | undefined;
  totalReminder: number | undefined;
  totalCount: number;
  topicDay: number;
};
export default function TopicCard({
  topicTitle,
  className,
  totalCount,
  totalReminder,
  totalSolved,
  topicDay,
}: Props) {
  const [reminderProgress, setReminderProgress] = useState(0);
  const [solvedProgress, setSolvedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (totalReminder) {
        const solvedPer = parseInt(
          ((totalReminder / totalCount) * 100).toFixed(2)
        );
        setReminderProgress(solvedPer);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [totalReminder, totalCount]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (totalSolved) {
        const solvedPer = parseInt(
          ((totalSolved / totalCount) * 100).toFixed(2)
        );
        setSolvedProgress(solvedPer);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [totalSolved, totalCount]);

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
                  {isNaN(totalSolved ?? 0) ? 0 : totalSolved}/{totalCount}
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
                  {isNaN(totalReminder ?? 0) ? 0 : totalReminder}/{totalCount}
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
