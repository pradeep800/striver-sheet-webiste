"use client";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import React, { useEffect, useState } from "react";

type Props = {
  title: string;
  total: number;
  solvedCount: number;
  className?: string;
};
export default function MainCard({
  title,
  total,
  className,
  solvedCount,
}: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const solvedPer = parseInt(((solvedCount / total) * 100).toFixed(2));
      setProgress(solvedPer);
    }, 500);
    return () => clearTimeout(timer);
  }, [solvedCount]);
  return (
    <Card className={`${className} border-0 shadow-none `}>
      <CardHeader>
        <CardTitle className="text-center font-bold text-4xl text-red-500">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} />
      </CardContent>
    </Card>
  );
}
