"use client";
import Back from "@/components/svg/back";
import { useEffect, useState } from "react";
import "@/styles/editor.css";
import Editor from "./editor";
import EditorHeading from "@/components/editorHeading";

import { useRouter } from "next/navigation";
import SaveAlert from "./saveAlert";
import { NotesInfo } from "./mainNotes";
import SaveNotes from "./saveNotesButton";

type Props = {
  notesInfo: NotesInfo;
};

export default function Notes({ notesInfo }: Props) {
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    function onbeforeunload(event: BeforeUnloadEvent) {
      event.returnValue = "There are unsaved changes. Leave now?";
    }
    window.onbeforeunload = onbeforeunload;
    //work around because removeEventListener is not working
    return () => {
      window.onbeforeunload = null;
      router.refresh();
    };
  }, []);
  const title = notesInfo.title;
  return (
    <div className=" mx-auto">
      <div className="flex  justify-between items-center">
        <div
          className="cursor-pointer ml-2"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Back />
        </div>
        <SaveNotes notesInfo={notesInfo} data={data} />
      </div>
      <div className="max-w-[650px] mx-auto">
        <div className="mt-8">
          <EditorHeading
            isEditModeOn={isEditModeOn}
            question={title}
            setIsEditModeOn={setIsEditModeOn}
          />

          <div className="editor">
            <Editor
              data={data}
              setData={setData}
              isEditModeOn={isEditModeOn}
              userRole={notesInfo.userRole}
            />
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
