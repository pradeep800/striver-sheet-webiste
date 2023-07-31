"use client";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import React, { useEffect, useState } from "react";
import SRProgress from "./SRprogress";

type Props = {
  title: string;
  total: number;
  solvedCount: number;
  className?: string;
  totalReminder: number;
};
export default function MainCard({
  title,
  total,
  className,
  solvedCount,
  totalReminder,
}: Props) {
  return (
    <Card className={`${className} border-0 shadow-none `}>
      <CardHeader>
        <CardTitle className="text-center font-bold text-4xl text-red-500">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SRProgress
          main={true}
          reminderValue={totalReminder}
          solvedValue={solvedCount}
          total={total}
        />
      </CardContent>
    </Card>
  );
}
