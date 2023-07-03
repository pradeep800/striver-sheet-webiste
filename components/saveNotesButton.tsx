import { saveQuestionInfo } from "@/server-action/saveQuestionInfo";
import { questionInfo } from "./mainNotes";
import { Button } from "./ui/button";
type Props = {
  questionInfo: questionInfo;
  data: any;
};
export default function SaveNotes({ questionInfo, data }: Props) {
  return (
    <Button
      className="hover:bg-red-400 bg-red-500"
      onClick={async () => {
        await saveQuestionInfo({
          name: questionInfo.title,
          questionDay: questionInfo.question_day_in_sheet,
          questionNumber: questionInfo.number,
          solved: questionInfo.solved,
          notes: data,
        });
        alert("saved");
      }}
    >
      Save
    </Button>
  );
}
