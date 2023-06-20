import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { trackingQuestions } from "@/lib/db/schema";
import { ssQuestions } from "@/static/striverSheet";
import { and, eq, notExists } from "drizzle-orm";
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
  if (questionNumber > 2 || questionNumber <= 0 || isNaN(questionNumber)) {
    redirect("/");
  }

  const session = await getServerSession(authOption);
  if (!session || !session.user || !session.user.id) {
    redirect("/");
  }
  const questions = await db
    .select()
    .from(trackingQuestions)
    .where(
      and(
        eq(trackingQuestions.questionNumber, questionNumber),
        eq(trackingQuestions.userId, session.user.id)
      )
    );
  if (questions.length === 0) {
    await db.insert(trackingQuestions).values({
      questionNumber: questionNumber,
      userId: session.user.id,
    });
  }

  redirect(
    questionSerial === 1
      ? ssQuestions[questionNumber].codingNinja
      : ssQuestions[questionNumber].leetCode
  );
}
