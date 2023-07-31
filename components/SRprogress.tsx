"use client";

import { useEffect, useState } from "react";
import { NToolTip } from "./tooltip";

type Props = {
  solvedValue: number;
  reminderValue: number;
  total: number;
  main: boolean | undefined;
};
export default function SRProgress({
  solvedValue,
  reminderValue,
  total,
  main,
}: Props) {
  const [solvedProgress, setSolvedProgress] = useState(0);
  const [reminderProgress, setReminderProgress] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const solvedPer = parseInt(((solvedValue / total) * 100).toFixed(2));
      let reminderPer = parseInt(((reminderValue / total) * 100).toFixed(2));
      if (solvedValue + reminderValue === total) {
        reminderPer = 100 - solvedPer;
      }
      setSolvedProgress(solvedPer);
      setReminderProgress(reminderPer);
    }, 500);
    return () => clearTimeout(timer);
  }, [solvedValue, reminderValue]);
  return (
    <div className="flex gap-2 flex-col " aria-label="Progress Bar">
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary ">
        <div
          className="h-full w-full flex-1  transition-all bg-green-600 absolute z-[1]"
          title={`solved questions ${solvedValue}/${total}`}
          style={{
            transform: `translateX(-${100 - (solvedProgress || 0)}%)`,
          }}
        />

        <div
          className="h-full w-full flex-1  transition-all bg-red-500 absolute"
          title={`reminder questions ${reminderValue}/${total}`}
          style={{
            transform: `translateX(-${
              100 - (solvedProgress + reminderProgress || 0)
            }%)`,
          }}
        />
      </div>
      {main ? null : (
        <div className="flex gap-4 flex-wrap justify-start sm:justify-end">
          <div className="flex items-center gap-1">
            <div className=" bg-red-500 w-4 h-4 rounded-lg" />
            <div>{`Reminder (${reminderValue}/${total})`}</div>
          </div>
          <div className=" flex items-center gap-1">
            <div className="bg-green-600 w-4 h-4 rounded-lg" />
            <div>{`Solved (${solvedValue}/${total})`}</div>
          </div>
        </div>
      )}
    </div>
  );
}
