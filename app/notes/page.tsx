"use client";

import Back from "@/components/svg/back";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import "./editor.css";
import dynamic from "next/dynamic";
import Editor from "../../components/editor";
import { Lock, Unlock } from "lucide-react";
import EditorHeading from "@/components/editorHeading";

const question = "Largest Sum Contiguous Subarray";
export default function Note() {
  const [isEditModeOn, setIsEditModeOn] = useState(true);
  const [data, setData] = useState([
    {
      type: "paragraph",
      data: {
        text: "<a></a>",
      },
    },
  ]);
  return (
    <div className=" mx-auto">
      <div className="flex  justify-between ">
        <Back />

        <Button className="hover:bg-red-400 bg-red-500">Save</Button>
      </div>
      <div className="max-w-[650px] mx-auto">
        <div className="mt-8">
          <EditorHeading
            isEditModeOn={isEditModeOn}
            question={question}
            setIsEditModeOn={setIsEditModeOn}
          />

          <div className="editor">
            <Editor data={data} setData={setData} isEditModeOn={isEditModeOn} />
          </div>
        </div>
      </div>
    </div>
  );
}
