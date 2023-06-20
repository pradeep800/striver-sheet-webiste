"use client";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ssQuestions, ssTopics } from "@/static/striverSheet";
type Props = {
  topicTitle: string;
  className?: string;
};
export default function TopicCard({ topicTitle, className }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  });

  const TitleNumber = ssTopics.indexOf(topicTitle);
  if (TitleNumber === -1) {
    throw Error("unable to find index of title");
  }

  return (
    <Link href={`/dashboard/day-${TitleNumber + 1}`}>
      <Card className={`${className} `}>
        <CardHeader>
          <CardTitle className="">
            Day {TitleNumber + 1} {topicTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex  gap-4 flex-col sm:flex-row">
            <div className="flex flex-col grow-[1] ">
              <div>Solved Question</div>
              <div className="flex items-center gap-3">
                <p>{"66/100"}</p>
                <Progress value={progress} />
              </div>
            </div>
            <div className="flex flex-col grow-[1]">
              <div>Reminders</div>
              <div className="flex items-center gap-3">
                <p>{"66/100"}</p>
                <Progress value={progress} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
