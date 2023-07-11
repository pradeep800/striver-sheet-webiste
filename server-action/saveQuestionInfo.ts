"use server";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { questions, reminders, users } from "@/lib/db/schema";
import { ssQuestions } from "@/static/striverSheet";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { zact } from "zact/server";
import { z } from "zod";
import { reminderDialogSchema } from "./zodType/reminderDialogsSchema";
export const saveQuestionInfo = zact(
  z.object({
    questionNumber: z.number(),
    solved: z.enum(["UNATTEMPTED", "REMINDER", "SOLVED"]),
    name: z.string(),
    questionDay: z.number(),
    notes: z.any().optional(),
    reminderData: reminderDialogSchema.optional(),
  })
)(
  async ({
    solved,
    questionNumber,
    name,
    questionDay,
    notes,
    reminderData,
  }) => {
    const session = await getServerSession(authOption);
    if (!session || !session.user || !session.user.id) {
      redirect("/");
    }

    console.log({
      solved,
      questionNumber,
      name,
      questionDay,
      notes,
      reminderData,
    });

    if (solved === "REMINDER") {
      if (!reminderData) {
        throw new Error("unable to create reminder");
      }
    }

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

    //check if question data is right
    const questionRealInfo = ssQuestions[questionNumber - 1];
    if (
      questionRealInfo.problem !== name ||
      questionRealInfo.topicNo + 1 != questionDay
    ) {
      redirect("/?error=Wrong Data Is Inserted");
    }

    await db.transaction(async (tx) => {
      try {
        //function for creating reminder
        const createReminder = async (
          data: NonNullable<typeof reminderData>
        ) => {
          const isEligibleForEmailReminder =
            user.role === "ADMIN" || user.role === "PROUSER";
          await tx.insert(reminders).values({
            due_date: data.dueDate,
            user_id: user.id,
            should_send_mail: isEligibleForEmailReminder && data.shouldSendMail,
            mail_sended: false,
            question_no: questionNumber,
          });
        };

        if (!question.length) {
          await tx.insert(questions).values({
            number: questionNumber,
            title: name,
            question_day_in_sheet: questionDay,
            sheet_id: user.striver_sheet_id_30_days,
            solved,
            notes_content: notes,
          });
        } else {
          const oldQuestionSolve = question[0].solved;

          if (oldQuestionSolve === "REMINDER") {
            await tx
              .delete(reminders)
              .where(
                and(
                  eq(reminders.user_id, user.id),
                  eq(reminders.question_no, questionNumber)
                )
              );
          }

          await tx
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
        }
        if (solved === "REMINDER") {
          if (reminderData) {
            createReminder(reminderData);
          } else {
            tx.rollback();
            return;
          }
        }
      } catch (err) {
        tx.rollback();
      }
    });
  }
);
