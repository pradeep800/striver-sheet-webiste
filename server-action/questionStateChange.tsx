"use server";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { questions, users } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { zact } from "zact/server";
import { z } from "zod";
export const QuestionStateChange = zact(
  z.object({
    questionNumber: z.number(),
    solved: z.enum(["UNATTEMPTED", "REMINDER", "SOLVED"]),
    name: z.string(),
    questionDay: z.number(),
  })
)(async ({ solved, questionNumber, name, questionDay }) => {
  const session = await getServerSession(authOption);
  if (!session || !session.user || !session.user.id) {
    redirect("/");
  }
  console.log({ solved, questionNumber, name, questionDay });
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));
  const question = await db
    .select()
    .from(questions)
    .where(
      and(
        eq(questions.sheet_id, user.striver_sheet_id_30_days),
        eq(questions.number, questionNumber)
      )
    );
  if (!question.length) {
    await db.insert(questions).values({
      number: questionNumber,
      title: name,
      question_day_in_sheet: questionDay,
      sheet_id: user.striver_sheet_id_30_days,
      solved,
    });
  } else {
    await db
      .update(questions)
      .set({
        solved,
      })
      .where(
        and(
          eq(questions.sheet_id, user.striver_sheet_id_30_days),
          eq(questions.number, questionNumber)
        )
      );
  }

  revalidatePath(`/dashboard/day-${questionDay}`);
  revalidatePath(`/dashboard/day-${questionDay}/${questionNumber}`);
});
