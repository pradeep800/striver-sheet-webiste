"use client";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
type Props = {
  title: string;
  total: number;
  className?: string;
};
export default function MainCard({ title, total, className }: Props) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(total);
    }, 500);
    return clearInterval(timer);
  }, []);
  return (
    <Card className={`${className} border-0 shadow-none`}>
      <CardHeader>
        <CardTitle className="text-center font-bold text-2xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} />
      </CardContent>
    </Card>
  );
}
