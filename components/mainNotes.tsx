import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { notes, users } from "@/lib/db/schema";

import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import Notes from "@/components/notes";
import NotesModal from "./notesModal";
import { getQuestionInfo } from "./pagesUtils";
type Props = {
  params: Record<string, string>;
  type: "modal" | "real";
};
export type NotesInfo = {
  content: unknown | null;
  title: string;
  questionNo: number;
  sheetId: string;
  userRole: Session["user"]["role"];
};

export const revalidate = 0;
export default async function MainNotes({ params, type }: Props) {
  const { question } = params;
  const questionNumber = parseInt(question);
  const session = await getServerSession(authOption);

  if (!session || !session.user || !session.user.id) {
    redirect("/");
  }
  const [userInfo] = await db
    .select({ sheetId: users.striver_sheet_id_30_days, role: users.role })
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!userInfo) {
    redirect("/accountDeleted");
  }

  const questionName = getQuestionInfo(questionNumber).problem;
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
      userRole: userInfo.role,
      content: null,
      questionNo: questionNumber,
      title: questionName,
      sheetId: userInfo.sheetId,
    };
  } else {
    notesInfo = {
      userRole: userInfo.role,
      content: dbNoteInfo.content,
      questionNo: questionNumber,
      title: questionName,
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
