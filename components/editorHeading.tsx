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
    <div className="flex justify-between flex-wrap gap-3 mb-4 ">
      <h1 className="md:text-3xl text-2xl font-bold tracking-wide text-red-500 mr-5">
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
