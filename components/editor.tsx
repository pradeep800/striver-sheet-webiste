"use client";

import EditorJS from "@editorjs/editorjs";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
type Props = {
  data: any;
  setData: React.Dispatch<any>;
  isEditModeOn: boolean;
};
export default function Editor({ data, setData, isEditModeOn }: Props) {
  const ref = useRef<EditorJS>();

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    //@ts-ignore
    const Header = (await import("@editorjs/header")).default;
    //@ts-ignore
    const Table = (await import("@editorjs/table")).default;
    //@ts-ignore
    const List = (await import("@editorjs/list")).default;
    //@ts-ignore
    const Code = (await import("@editorjs/code")).default;
    //@ts-ignore
    const CheckBox = (await import("@editorjs/checklist")).default;

    const editor = new EditorJS({
      holder: "editor",
      autofocus: true,

      placeholder: "You can type your notes here...",
      onReady() {
        ref.current = editor;
      },

      inlineToolbar: true,

      onChange: async (e) => {
        const data = await ref.current?.save();
        if (data && data?.blocks.length < 1) {
          ref.current?.blocks.insert("paragraph", {
            text: "<a></a>",
          });
        }
        setData(data?.blocks);
      },

      data: {
        time: new Date().getTime(),
        version: "2.25.0",
        blocks: data,
      },

      tools: {
        header: Header,
        list: List,
        code: Code,
        table: Table,
        CheckBox: CheckBox,
      },
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isEditModeOn) {
      if (ref.current) ref.current.readOnly.toggle(false);
    } else {
      if (ref.current) ref.current.readOnly.toggle(true);
    }
  }, [isEditModeOn]);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  if (!isMounted) {
    return <Loader2 className="animate-spin flex justify-center w-[100%]" />;
  }
  return <div id="editor" className=""></div>;
}
