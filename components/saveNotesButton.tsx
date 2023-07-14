"use client";
import { NotesInfo } from "./mainNotes";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { useState, useTransition } from "react";
import Loading from "./svg/loading";
import { saveNotes } from "@/server-action/saveNotes";
import { useRouter } from "next/navigation";
type Props = {
  notesInfo: NotesInfo;
  data: any;
};
export default function SaveNotes({ notesInfo, data }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <Button
      className="hover:bg-red-400 bg-red-500"
      onClick={async () => {
        try {
          setLoading(true);
          console.log(notesInfo, data);
          const serverAction = await saveNotes({
            questionNo: notesInfo.questionNo,
            sheetId: notesInfo.sheetId,
            content: data,
          });
          startTransition(() => {
            router.refresh();
          });
          if (serverAction?.error) {
            toast({ title: serverAction?.error, variant: "destructive" });
          } else {
            toast({ title: "successfully notes are updated" });
          }
        } catch (err) {
          const error = err as Error;
          toast({ title: "Unable to update", variant: "destructive" });
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      }}
    >
      {loading && <Loading />}
      <p className="mx-2 text-lg font-bold dark:text-white">Save</p>
    </Button>
  );
}
