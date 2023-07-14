import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { notes, users } from "@/lib/db/schema";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import Notes from "@/components/notes";
import NotesModal from "./notesModal";
import { getQuestionDay, getQuestionInfo } from "./pagesUtils";
type Props = {
  params: Record<string, string>;
  type: "modal" | "real";
};
export type NotesInfo = {
  content: unknown | null;
  title: string;
  questionNo: number;
  sheetId: string;
};
export const revalidate = 0;
export default async function MainNotes({ params, type }: Props) {
  const { questionNo } = params;
  const questionNumber = parseInt(questionNo);
  const session = await getServerSession(authOption);

  if (!session || !session.user || !session.user.id) {
    redirect("/");
  }
  const [userInfo] = await db
    .select({ sheetId: users.striver_sheet_id_30_days })
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!userInfo) {
    redirect("/accountDeleted");
  }

  const question = getQuestionInfo(questionNumber);
  let notesInfo!: NotesInfo;
  const [dbNoteInfo] = await db
    .select({ content: notes.content })
    .from(notes)
    .where(
      and(
        eq(notes.sheet_id, userInfo.sheetId),
        eq(notes.question_no, questionNumber)
      )
    )
    .limit(1);
  if (!dbNoteInfo) {
    notesInfo = {
      content: null,
      questionNo: questionNumber,
      title: question.problem,
      sheetId: userInfo.sheetId,
    };
  } else {
    notesInfo = {
      content: dbNoteInfo.content,
      questionNo: questionNumber,
      title: question.problem,
      sheetId: userInfo.sheetId,
    };
  }

  return (
    <div>
      {type === "modal" ? (
        <NotesModal notesInfo={notesInfo} />
      ) : (
        <Notes notesInfo={notesInfo} />
      )}
    </div>
  );
}
