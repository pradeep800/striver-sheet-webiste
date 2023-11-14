import { db } from "@/lib/db";
import { router } from "./trpc";
import { privateProcedure } from "./trpc";
import z from "zod";
import { desc, eq, and } from "drizzle-orm";
import { aiChatMessages } from "@/lib/db/schema";
import { infiniteChatLimit } from "@/static/infiniteScrolling";
export const appRouter = router({
  infiniteMessage: privateProcedure
    .input(z.object({ questionNo: z.number(), cursor: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      let { questionNo, cursor: offset } = input;
      const userId = ctx.userId;
      offset = offset ? offset : 0;
      return db
        .select({
          id: aiChatMessages.id,
          message: aiChatMessages.message,
          sender: aiChatMessages.sender,
          createdAt: aiChatMessages.created_at,
        })
        .from(aiChatMessages)
        .where(
          and(
            eq(aiChatMessages.userId, userId),
            eq(aiChatMessages.question_no, questionNo)
          )
        )
        .limit(infiniteChatLimit)
        .offset(offset)
        .orderBy(desc(aiChatMessages.created_at));
    }),
});

export type AppRouter = typeof appRouter;
