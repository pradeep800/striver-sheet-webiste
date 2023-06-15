"use client";

import { Lock, Unlock } from "lucide-react";
import React from "react";

type Props = {
  question: string;
  setIsEditModeOn: React.Dispatch<boolean>;
  isEditModeOn: boolean;
};
export default function EditorHeading({
  question,
  setIsEditModeOn,
  isEditModeOn,
}: Props) {
  return (
    <div className="flex justify-between flex-wrap gap-3 mb-2 flex-col items-center  ">
      <h1 className="text-2xl font-bold tracking-wide text-red-500 mr-5 text-center">
        {question}
      </h1>
      <div
        className="text-red-500 hover:text-red-400"
        onClick={() => setIsEditModeOn(!isEditModeOn)}
      >
        {!isEditModeOn ? <Lock /> : <Unlock />}
      </div>
    </div>
  );
}
