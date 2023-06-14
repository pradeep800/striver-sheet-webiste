"use client";
import { useState } from "react";
import Editor from "./editor";
import Modal from "./modal";
import EditorHeading from "./editorHeading";
import { Button } from "./ui/button";
import { X } from "lucide-react";

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
  return (
    <Modal>
      <div className="max-w-[650px] mx-auto p-3 bg-white  rounded-md  button-4 ">
        <div className="flex justify-between ">
          <X />
          <Button className="hover:bg-red-400 bg-red-500">Save</Button>
        </div>
        <div>
          <div className="mt-8">
            <EditorHeading
              isEditModeOn={isEditModeOn}
              question={"hello there how are you"}
              setIsEditModeOn={setIsEditModeOn}
            />

            <div className="editor max-w-[650px] overflow-scroll h-[600px]">
              <Editor
                data={data}
                setData={setData}
                isEditModeOn={isEditModeOn}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
