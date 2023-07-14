import { saveQuestionInfo } from "@/server-action/saveQuestionInfo";
import { NotesInfo } from "./mainNotes";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import Loading from "./svg/loading";
import { saveNotes } from "@/server-action/saveNotes";
type Props = {
  notesInfo: NotesInfo;
  data: any;
};
export default function SaveNotes({ notesInfo, data }: Props) {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      className="hover:bg-red-400 bg-red-500"
      onClick={async () => {
        try {
          setLoading(true);
          await saveNotes({
            questionNo: notesInfo.day,
            sheetId: notesInfo.sheetId,
            content: data,
          });
          toast({ title: "successfully notes are updated" });
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
