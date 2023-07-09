import { saveQuestionInfo } from "@/server-action/saveQuestionInfo";
import { questionInfo } from "./mainNotes";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import Loading from "./svg/loading";
type Props = {
  questionInfo: questionInfo;
  data: any;
};
export default function SaveNotes({ questionInfo, data }: Props) {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      className="hover:bg-red-400 bg-red-500"
      onClick={async () => {
        try {
          setLoading(true);
          await saveQuestionInfo({
            name: questionInfo.title,
            questionDay: questionInfo.question_day_in_sheet,
            questionNumber: questionInfo.number,
            solved: questionInfo.solved,
            notes: data,
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
      <p className="mx-2 text-lg font-bold">Save</p>
    </Button>
  );
}
