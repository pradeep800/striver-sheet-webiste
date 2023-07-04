"use client";

import Back from "@/components/svg/back";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import "@/styles/editor.css";
import Editor from "./editor";
import EditorHeading from "@/components/editorHeading";

import { useRouter } from "next/navigation";
import SaveAlert from "./saveAlert";
import { questionInfo } from "./mainNotes";
import SaveNotes from "./saveNotesButton";

type Props = {
  questionInfo: questionInfo;
};

export default function Notes({ questionInfo }: Props) {
  const [isEditModeOn, setIsEditModeOn] = useState(true);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [didSomethingChange, setDidSomethingChange] = useState(false);
  const [data, setData] = useState<any>(
    questionInfo?.notes_content ?? [
      {
        type: "paragraph",
        data: {
          text: "<a></a>",
        },
      },
    ]
  );
  useEffect(() => {
    function onbeforeunload(event: BeforeUnloadEvent) {
      event.returnValue = "There are unsaved changes. Leave now?";
    }
    window.onbeforeunload = onbeforeunload;
    //work around because removeEventListener is not working
    return () => {
      window.onbeforeunload = null;
    };
  }, []);
  const title = questionInfo.title;
  return (
    <div className=" mx-auto">
      <div className="flex  justify-between ">
        <div
          className="cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Back />
        </div>
        <SaveNotes questionInfo={questionInfo} data={data} />
      </div>
      <div className="max-w-[650px] mx-auto">
        <div className="mt-8">
          <EditorHeading
            isEditModeOn={isEditModeOn}
            question={title}
            setIsEditModeOn={setIsEditModeOn}
          />

          <div className="editor">
            <Editor data={data} setData={setData} isEditModeOn={isEditModeOn} />
          </div>
        </div>
      </div>
      <SaveAlert
        open={open}
        setOpen={setOpen}
        back={() => {
          router.push("/");
        }}
      />
    </div>
  );
}
