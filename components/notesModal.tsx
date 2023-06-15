"use client";
import { useEffect, useState } from "react";
import Editor from "./editor";
import Modal from "./modal";
import EditorHeading from "./editorHeading";
import { Button } from "./ui/button";
import { Router, X } from "lucide-react";
import { useRouter } from "next/navigation";
import SaveAlert from "./saveAlert";

export default function NotesModal() {
  const [isEditModeOn, setIsEditModeOn] = useState(true);
  const [data, setData] = useState([
    {
      type: "paragraph",
      data: {
        text: "<a></a>",
      },
    },
  ]);
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
              question={"hello there how are you"}
              setIsEditModeOn={setIsEditModeOn}
            />

            <div className="editor overflow-scroll h-[600px]">
              <Editor
                data={data}
                setData={setData}
                isEditModeOn={isEditModeOn}
              />
            </div>
          </div>
        </div>
      </div>
      <SaveAlert open={open} setOpen={setOpen} />
    </Modal>
  );
}
