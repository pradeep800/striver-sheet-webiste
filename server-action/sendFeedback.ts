"use server";
import { zact } from "zact/server";
import { feedBackSchema } from "./zodType/feedbackSchema";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { feedbacks } from "@/lib/db/schema";

export const sendFeedback = zact(feedBackSchema)(async (input) => {
  const session = await getServerSession(authOption);
  if (!session || !session.user) {
    return {
      error:
        "please login or if you already login please signout and then login",
    };
  }
  try {
    await db.insert(feedbacks).values({
      type: input.type,
      content: input.content,
      user_id: session.user.id,
      user_role: session.user.role,
    });
  } catch (err) {
    console.log(`unable to insert ${input.type} from ${session.user.id}`);
    const error = err as Error;
    return { error: `unable to send ${input.type}` };
  }
});
