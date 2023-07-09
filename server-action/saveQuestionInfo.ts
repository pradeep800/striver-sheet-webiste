"use server";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { questions, users } from "@/lib/db/schema";
import { ssQuestions } from "@/static/striverSheet";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { zact } from "zact/server";
import { z } from "zod";
export const saveQuestionInfo = zact(
  z.object({
    questionNumber: z.number(),
    solved: z.enum(["UNATTEMPTED", "REMINDER", "SOLVED"]),
    name: z.string(),
    questionDay: z.number(),
    notes: z.any().optional(),
  })
)(async ({ solved, questionNumber, name, questionDay, notes }) => {
  const session = await getServerSession(authOption);
  if (!session || !session.user || !session.user.id) {
    redirect("/");
  }
  console.log({ solved, questionNumber, name, questionDay, notes });
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!user) {
    throw new Error("account deleted");
  }

  const question = await db
    .select()
    .from(questions)
    .where(
      and(
        eq(questions.sheet_id, user.striver_sheet_id_30_days),
        eq(questions.number, questionNumber)
      )
    );
  //check if it is correct data
  const questionRealInfo = ssQuestions[questionNumber - 1];
  if (
    questionRealInfo.problem !== name ||
    questionRealInfo.topicNo + 1 != questionDay
  ) {
    redirect("/?error=Wrong Data Is Inserted");
  }

  if (!question.length) {
    await db.insert(questions).values({
      number: questionNumber,
      title: name,
      question_day_in_sheet: questionDay,
      sheet_id: user.striver_sheet_id_30_days,
      solved,
      notes_content: notes,
    });
  } else {
    try {
      await db
        .update(questions)
        .set({
          solved,
          notes_content: notes ?? question?.[0].notes_content,
        })
        .where(
          and(
            eq(questions.sheet_id, user.striver_sheet_id_30_days),
            eq(questions.number, questionNumber)
          )
        );
    } catch (err) {
      console.log(err);
    }
  }
});
