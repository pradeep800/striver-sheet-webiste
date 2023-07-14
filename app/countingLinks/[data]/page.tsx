import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { trackingQuestions, users } from "@/lib/db/schema";
import { ssQuestions } from "@/static/striverSheet";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
type Props = {
  params: { data: `${number}-${number}` }; //
};
export default async function CountingLinkPage({ params }: Props) {
  const { data } = params;
  const questionInfo = data.match(/(\d+)-(\d+)/);
  if (!questionInfo || !questionInfo[1] || !questionInfo[2]) {
    redirect("/");
  }
  const questionNumber = parseInt(questionInfo[1]);
  if (questionNumber > 191 || questionNumber <= 0 || isNaN(questionNumber)) {
    redirect("/");
  }
  const questionSerial = parseInt(questionInfo[2]);
  if (questionSerial > 2 || questionSerial <= 0 || isNaN(questionSerial)) {
    redirect("/");
  }
  const session = await getServerSession(authOption);
  if (!session || !session.user || !session.user.id) {
    redirect("/");
  }
  const questions = await db
    .select({ id: trackingQuestions.id })
    .from(trackingQuestions)
    .where(
      and(
        eq(trackingQuestions.question_number, questionNumber),
        eq(trackingQuestions.user_id, session.user.id)
      )
    );
  if (questions.length === 0) {
    await db.insert(trackingQuestions).values({
      question_number: questionNumber,
      user_id: session.user.id,
    });
  }

  redirect(
    questionSerial === 1
      ? ssQuestions[questionNumber - 1].codingNinja
      : ssQuestions[questionNumber - 1].leetCode
  );
}
