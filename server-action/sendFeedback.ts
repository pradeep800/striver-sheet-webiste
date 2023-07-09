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
    throw new Error("Please login");
  }
  try {
    await db.insert(feedbacks).values({
      type: input.type,
      content: input.content,
      userId: session.user.id,
      userRole: session.user.role,
    });
  } catch (err) {
    console.log("unable to insert feedback");
    const error = err as Error;
    throw new Error("Unable To Send Feedback");
  }
});
