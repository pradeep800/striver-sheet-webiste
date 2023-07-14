"use server";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { questions, reminders, users } from "@/lib/db/schema";
import { ssQuestions } from "@/static/striverSheet";
import { and, eq } from "drizzle-orm";
import { Session, getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { zact } from "zact/server";
import { z } from "zod";
import { reminderDialogSchema } from "./zodType/reminderDialogsSchema";
import { getQuestionDay, getQuestionInfo } from "@/components/pagesUtils";
import { LogServerAndReturn } from "@/lib/serverActionUtils";
import { serverSession } from "@/lib/serverSession";
export const saveQuestionInfo = zact(
  z.object({
    questionNumber: z.number(),
    solved: z.enum(["UNATTEMPTED", "REMINDER", "SOLVED"]),
    name: z.string(),
    questionDay: z.number(),

    reminderData: reminderDialogSchema.optional(),
  })
)(async (input) => {
  let session: Session | boolean | undefined;
  try {
    session = await serverSession();
    if (typeof session === "boolean") {
      return { error: "Your are not login" };
    }

    if (input.solved === "REMINDER") {
      if (!input.reminderData) {
        return { error: "Unable to create reminder" };
      }
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id));

    if (!user) {
      return { error: "Your account is deleted" };
    }

    const question = await db
      .select()
      .from(questions)
      .where(
        and(
          eq(questions.sheet_id, user.striver_sheet_id_30_days),
          eq(questions.number, input.questionNumber)
        )
      )
      .limit(1);

    //check if question data is right
    const questionRealInfo = getQuestionInfo(input.questionNumber);
    if (
      questionRealInfo.problem !== input.name ||
      getQuestionDay(input.questionNumber) != input.questionDay
    ) {
      return { error: "Wrong data" };
    }

    await db.transaction(async (tx) => {
      try {
        //function for creating reminder
        const createReminder = async (
          data: NonNullable<typeof input.reminderData>
        ) => {
          const isEligibleForEmailReminder =
            user.role === "ADMIN" || user.role === "PROUSER";
          await tx.insert(reminders).values({
            due_date: data.dueDate,
            user_id: user.id,
            should_send_mail: isEligibleForEmailReminder && data.shouldSendMail,
            mail_sended: false,
            question_no: input.questionNumber,
          });
        };

        if (!question.length) {
          await tx.insert(questions).values({
            number: input.questionNumber,
            title: input.name,
            day: input.questionDay,
            sheet_id: user.striver_sheet_id_30_days,
            solved: input.solved,
          });
        } else {
          const oldQuestionSolve = question[0].solved;

          if (oldQuestionSolve === "REMINDER") {
            //delete old question
            await tx
              .delete(reminders)
              .where(
                and(
                  eq(reminders.user_id, user.id),
                  eq(reminders.question_no, input.questionNumber)
                )
              );
          }

          await tx
            .update(questions)
            .set({
              solved: input.solved,
            })
            .where(
              and(
                eq(questions.sheet_id, user.striver_sheet_id_30_days),
                eq(questions.number, input.questionNumber)
              )
            );
        }
        if (input.solved === "REMINDER") {
          if (input.reminderData) {
            createReminder(input.reminderData);
          } else {
            tx.rollback();
            return;
          }
        }
      } catch (err) {
        tx.rollback();
      }
    });
  } catch (err) {
    return LogServerAndReturn(err, session);
  }
});
