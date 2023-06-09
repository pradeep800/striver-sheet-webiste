"use client";

import Back from "@/components/svg/back";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import "./editor.css";
import { data as staleData } from "./data";
import dynamic from "next/dynamic";
import Editor from "./editor";
import { Lock, Unlock } from "lucide-react";

const question = "Largest Sum Contiguous Subarray";
export default function Note() {
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [data, setData] = useState(staleData as any);
  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="flex  justify-between ">
        <Back />

        <Button className="hover:bg-red-400 bg-red-500">Save</Button>
      </div>
      <div className="max-w-[650px] mx-auto">
        <div className="mt-8">
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

          <div>
            <Editor data={data} setData={setData} isEditModeOn={isEditModeOn} />
          </div>
        </div>
      </div>
    </div>
  );
}
