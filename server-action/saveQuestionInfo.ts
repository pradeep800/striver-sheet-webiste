"use server";
import { db } from "@/lib/db";
import { questions, reminders, users } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { Session } from "next-auth";

import { zact } from "zact/server";
import { z } from "zod";
import { reminderDialogSchema } from "./zodType/reminderDialogsSchema";
import { getQuestionDay, getQuestionInfo } from "@/components/pagesUtils";
import {
  LogServerAndReturn,
  ReturnDeletedAccount,
  ReturnNoSession,
} from "@/lib/serverActionUtils";
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
  let session: Session | undefined;
  try {
    session = await serverSession();
    if (!session) {
      return ReturnNoSession();
    }

    if (input.solved === "REMINDER") {
      if (!input.reminderData) {
        return { error: "Unable to create reminder" };
      }
    }

    const [user] = await db
      .select({
        id: users.id,
        sheetId: users.striver_sheet_id_30_days,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, session.user.id));

    if (!user) {
      return ReturnDeletedAccount();
    }
    const question = await db
      .select({ solved: questions.solved })
      .from(questions)
      .where(
        and(
          eq(questions.sheet_id, user.sheetId),
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

        if (!question.length) {
          await tx.insert(questions).values({
            number: input.questionNumber,
            title: input.name,
            day: input.questionDay,
            sheet_id: user.sheetId,
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
                eq(questions.sheet_id, user.sheetId),
                eq(questions.number, input.questionNumber)
              )
            );
        }
        if (input.solved === "REMINDER") {
          if (input.reminderData) {
            const isEligibleForEmailReminder =
              user.role === "ADMIN" || user.role === "PROUSER";
            const a = await tx.insert(reminders).values({
              due_date: input.reminderData.dueDate,
              user_id: user.id,
              should_send_mail:
                isEligibleForEmailReminder && input.reminderData.shouldSendMail,
              mail_sended: false,
              question_no: input.questionNumber,
            });
          } else {
            tx.rollback();
            return { error: "Please add reminder Info" };
          }
        }
      } catch (err) {
        tx.rollback();
        return { error: "Please try again" };
      }
    });
  } catch (err) {
    return LogServerAndReturn("saveQuestionInfo", err, session);
  }
});
