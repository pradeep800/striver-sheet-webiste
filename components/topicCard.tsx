"use client";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";
import SRProgress from "./SRprogress";

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
  return (
    <Link className="" href={`/sheet/day-${topicDay}`}>
      <Card
        className={`${className} hover:bg-slate-200 dark:bg-gray-600 dark:hover:bg-gray-500 text-black dark:text-white`}
      >
        <CardHeader>
          <CardTitle className="">
            Day {topicDay} {topicTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SRProgress
            main={false}
            reminderValue={
              totalReminder ? (isNaN(totalReminder) ? 0 : totalReminder) : 0
            }
            solvedValue={
              totalSolved ? (isNaN(totalSolved) ? 0 : totalSolved) : 0
            }
            total={totalCount}
          />
        </CardContent>
      </Card>
    </Link>
  );
}
