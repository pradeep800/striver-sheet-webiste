"use client";
import { useEffect, useState } from "react";
import Editor from "./editor";
import Modal from "./modal";
import EditorHeading from "./editorHeading";
import { X } from "lucide-react";

import SaveAlert from "./saveAlert";
import { NotesInfo } from "./mainNotes";
import SaveNotes from "./saveNotesButton";
import { useRouter } from "next/navigation";
type Props = {
  notesInfo: NotesInfo;
};
export default function NotesModal({ notesInfo }: Props) {
  const router = useRouter();
  const [data, setData] = useState<any>(
    notesInfo?.content ?? [
      {
        type: "paragraph",
        data: {
          text: "<a></a>",
        },
      },
    ]
  );
  const [isEditModeOn, setIsEditModeOn] = useState(() => {
    if (notesInfo && notesInfo.content) {
      return false;
    }
    return true;
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onbeforeunload(event: BeforeUnloadEvent) {
      event.returnValue = "There are unsaved changes. Leave now?";
    }
    window.onbeforeunload = onbeforeunload;
    return () => {
      router.refresh();
      window.onbeforeunload = null;
    };
  }, []);

  const title = notesInfo.title;
  return (
    <Modal>
      <div className="max-w-[800px] mx-auto p-3 rounded-md  bg-background border shadow-md ">
        <div className="flex justify-between ">
          <X
            className="dark:fill-white hover:text-red-500 w-[50px]"
            onClick={() => {
              setOpen(true);
            }}
          />
          <SaveNotes notesInfo={notesInfo} data={data} />
        </div>
        <div>
          <div className="mt-2">
            <EditorHeading
              isEditModeOn={isEditModeOn}
              question={title}
              setIsEditModeOn={setIsEditModeOn}
            />

            <div className="editor overflow-scroll h-[600px]">
              <Editor
                userRole={notesInfo.userRole}
                setData={setData}
                data={data}
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
