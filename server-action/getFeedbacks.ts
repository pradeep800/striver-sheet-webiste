"use server";
import { db } from "@/lib/db";
import { feedbacks as fbs, users } from "@/lib/db/schema";

import {
  LogServerAndReturnError,
  ReturnNoSession,
} from "@/lib/serverActionUtils";
import { serverSession } from "@/lib/serverSession";
import { maxFeedback } from "@/static/infiniteScrolling";
import { eq, sql } from "drizzle-orm";
import { Session } from "next-auth";
import { zact } from "zact/server";
import { z } from "zod";

export const getFeedbacks = zact(z.object({ offset: z.number() }))(
  async (input) => {
    let session: Session | undefined;
    try {
      session = await serverSession();
      if (!session) {
        return ReturnNoSession();
      }
      const feedbacks = await db
        .select({
          id: fbs.id,
          userName: users.userName,
          email: fbs.mail,
          content: fbs.content,
          type: fbs.type,
          name: users.name,
          role: fbs.user_role,
          created: fbs.created_at,
        })
        .from(fbs)
        .innerJoin(users, eq(users.id, fbs.user_id))
        .orderBy(sql`${fbs.created_at} desc,${fbs.user_role}`)
        .limit(maxFeedback)
        .offset(input.offset);
      return feedbacks;
    } catch (err) {
      return LogServerAndReturnError("getFeedbacks.ts", err, session);
    }
  }
);
