"use client";
import { useEffect, useState } from "react";
import Editor from "./editor";
import Modal from "./modal";
import EditorHeading from "./editorHeading";
import { Button } from "./ui/button";
import { Router, X } from "lucide-react";
import SaveAlert from "./saveAlert";
type Props = {
  title: string;
  notesContent: unknown;
};
export default function NotesModal({ notesContent, title }: Props) {
  const [isEditModeOn, setIsEditModeOn] = useState(true);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    function onbeforeunload(event: BeforeUnloadEvent) {
      event.returnValue = "There are unsaved changes. Leave now?";
    }
    window.onbeforeunload = onbeforeunload;
    return () => {
      window.onbeforeunload = null;
    };
  }, []);
  return (
    <Modal>
      <div className="max-w-[800px] mx-auto p-3 bg-white  rounded-md   ">
        <div className="flex justify-between ">
          <X
            onClick={() => {
              setOpen(true);
            }}
          />
          <Button className="hover:bg-red-400 bg-red-500">Save</Button>
        </div>
        <div>
          <div className="mt-2">
            <EditorHeading
              isEditModeOn={isEditModeOn}
              question={title}
              setIsEditModeOn={setIsEditModeOn}
            />

            <div className="editor overflow-scroll h-[600px]">
              <Editor notesContent={notesContent} isEditModeOn={isEditModeOn} />
            </div>
          </div>
        </div>
      </div>
      <SaveAlert open={open} setOpen={setOpen} />
    </Modal>
  );
}
