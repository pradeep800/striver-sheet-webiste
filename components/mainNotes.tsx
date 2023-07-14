import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { questions, users } from "@/lib/db/schema";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { ssQuestions } from "@/static/striverSheet";
import Notes from "@/components/notes";
import NotesModal from "./notesModal";
type Props = {
  params: Record<string, string>;
  type: "modal" | "real";
};
export type questionInfo = {
  number: number;
  solved: "UNATTEMPTED" | "REMINDER" | "SOLVED";
  title: string;
  question_day_in_sheet: number;
  notes_content: unknown | null;
};
export default async function MainNotes({ params, type }: Props) {
  const { questionNo } = params;
  const questionNumber = parseInt(questionNo);
  const session = await getServerSession(authOption);

  if (!session || !session.user || !session.user.id) {
    redirect("/");
  }
  const [userInfo] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!userInfo) {
    redirect("/accountDeleted");
  }

  const [databaseQuestionInfo] = await db
    .select({
      number: questions.number,
      solved: questions.solved,
      title: questions.title,
      question_day_in_sheet: questions.question_day_in_sheet,
      notes_content: questions.notes_content,
    })
    .from(questions)
    .where(
      and(
        eq(questions.sheet_id, userInfo.striver_sheet_id_30_days),
        eq(questions.number, questionNumber)
      )
    );
  let questionInfo!: questionInfo;
  if (!databaseQuestionInfo) {
    const ssQuestion = ssQuestions[questionNumber - 1];
    questionInfo = {
      number: questionNumber,
      solved: "UNATTEMPTED",
      title: ssQuestion.problem,
      question_day_in_sheet: ssQuestion.topicNo + 1,
      notes_content: null,
    };
  } else {
    questionInfo = databaseQuestionInfo;
  }

  return (
    <div>
      {type === "modal" ? (
        <NotesModal questionInfo={questionInfo} />
      ) : (
        <Notes questionInfo={questionInfo} />
      )}
    </div>
  );
}
