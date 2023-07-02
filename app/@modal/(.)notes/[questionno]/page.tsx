import NotesModal from "@/components/notesModal";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { questions, users } from "@/lib/db/schema";
import "@/styles/editor.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { ssQuestions } from "@/static/striverSheet";
type Props = {
  params: { [key: string]: string };
};
export default async function Notes({ params }: Props) {
  const { questionno } = params;
  const questionNumber = parseInt(questionno);
  const session = await getServerSession(authOption);

  if (!session || !session.user || !session.user.id) {
    redirect("/");
  }
  const [userInfo] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));
  const [questionInfo] = await db
    .select({ notesContent: questions.notes_content, title: questions.title })
    .from(questions)
    .where(
      and(
        eq(questions.sheet_id, userInfo.striver_sheet_id_30_days),
        eq(questions.number, questionNumber)
      )
    );
  const title = ssQuestions[questionNumber - 1].problem;
  return (
    <div>
      <NotesModal
        title={questionInfo?.title ?? title}
        notesContent={questionInfo?.notesContent}
      />
      ;
    </div>
  );
}
