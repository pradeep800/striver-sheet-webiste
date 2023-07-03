"use client";
import { useEffect, useState } from "react";
import Editor from "./editor";
import Modal from "./modal";
import EditorHeading from "./editorHeading";
import { X } from "lucide-react";

import SaveAlert from "./saveAlert";
import { questionInfo } from "./mainNotes";
import SaveNotes from "./saveNotesButton";
type Props = {
  questionInfo: questionInfo;
};
export default function NotesModal({ questionInfo }: Props) {
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

  const title = questionInfo.title;
  return (
    <Modal>
      <div className="max-w-[800px] mx-auto p-3 bg-white  rounded-md   ">
        <div className="flex justify-between ">
          <X
            onClick={() => {
              setOpen(true);
            }}
          />
          <SaveNotes questionInfo={questionInfo} data={data} />
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
