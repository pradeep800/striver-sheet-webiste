"use server";
import { zact } from "zact/server";
import { feedBackSchema } from "./zodType/feedbackSchema";
import { Session } from "next-auth";
import { db } from "@/lib/db";
import { feedbacks } from "@/lib/db/schema";
import { serverSession } from "@/lib/serverSession";
import { LogServerAndReturn, ReturnNoSession } from "@/lib/serverActionUtils";

export const sendFeedback = zact(feedBackSchema)(async (input) => {
  let session: Session | undefined;
  try {
    session = await serverSession();
    if (!session) {
      return ReturnNoSession();
    }

    await db.insert(feedbacks).values({
      type: input.type,
      mail: session.user.email ?? "",
      content: input.content,
      user_id: session.user.id,
      user_role: session.user.role,
    });
  } catch (err) {
    return LogServerAndReturn("sendFeedback", err, session);
  }
});
