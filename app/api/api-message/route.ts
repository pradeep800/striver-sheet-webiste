import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { aiChatMessages } from "@/lib/db/schema";
import { openai } from "@/lib/openai";
import { aiMessageValidator } from "@/server-action/zodType/aiMessageValidator";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import fs from "fs";
import { and, desc, eq } from "drizzle-orm";
import { OpenAIStream, StreamingTextResponse } from "ai";
const previousConversationCount = 5;
export async function POST(req: NextRequest) {
  const body = await req.json();
  const session = await getServerSession(authOption);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const data = aiMessageValidator.safeParse(body);
  if (!data.success) {
    return new Response("Missing message", { status: 400 });
  } else {
    await db.insert(aiChatMessages).values({
      question_no: data.data.questionsNumber,
      userId: session.user.id,
      message: data.data.message,
      sender: "USER",
    });
    const question = fs.readFileSync(
      `/sheet-questions/${data.data.questionsNumber}`,
      "utf-8"
    );
    const previousConversations = await db
      .select({
        message: aiChatMessages.message,
        sender: aiChatMessages.sender,
      })
      .from(aiChatMessages)
      .where(
        and(
          eq(aiChatMessages.question_no, data.data.questionsNumber),
          eq(aiChatMessages.userId, session.user.id)
        )
      )
      .orderBy(desc(aiChatMessages.created_at));
    previousConversations.reverse();
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0,
      stream: true,
      messages: [
        {
          role: "system",
          content: `You are DSA expert and you have question in context and last ${previousConversationCount} previous conversation and give answer in markdown `,
        },
        {
          role: "user",
          content: `
      Question:
      ${question}
      Previous Conversation:
    ${previousConversations.map((message) => {
      if (message.sender === "USER") return `User: ${message.message}\n`;
      return `Assistant: ${message.message}\n`;
    })}?
      `,
        },
      ],
    });
    const stream = OpenAIStream(response, {
      async onCompletion(completion) {
        await db.insert(aiChatMessages).values({
          userId: session.user.id,
          message: completion,
          sender: "AI",
          question_no: data.data.questionsNumber,
        });
      },
    });
    return new StreamingTextResponse(stream);
  }
}
