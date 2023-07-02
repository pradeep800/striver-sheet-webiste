"use client";

import Back from "@/components/svg/back";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import "@/styles/editor.css";
import Editor from "./editor";
import EditorHeading from "@/components/editorHeading";

import { useRouter } from "next/navigation";
import SaveAlert from "./saveAlert";

type Props = {
  title: string;
  notesContent: unknown;
};
export default function Notes({ title, notesContent }: Props) {
  const [isEditModeOn, setIsEditModeOn] = useState(true);
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
        <Button className="hover:bg-red-400 bg-red-500">Save</Button>
      </div>
      <div className="max-w-[650px] mx-auto">
        <div className="mt-8">
          <EditorHeading
            isEditModeOn={isEditModeOn}
            question={title}
            setIsEditModeOn={setIsEditModeOn}
          />

          <div className="editor">
            <Editor notesContent={notesContent} isEditModeOn={isEditModeOn} />
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
