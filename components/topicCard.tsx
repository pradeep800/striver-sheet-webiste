"use client";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
type Props = {
  data: Record<string, number>;
  className?: string;
};
export default function TopicCard({ data, className }: Props) {
  const [progress, setProgress] = useState(0);
  const Title = useRef(Object.keys(data)[0]);
  const Day = useRef(data[Object.keys(data)[0]]);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  });
  return (
    <Link href={`/dashboard/day-${Day.current}`}>
      <Card className={`${className}`}>
        <CardHeader>
          <CardTitle className="">
            Day {Day.current} {Title.current}
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
