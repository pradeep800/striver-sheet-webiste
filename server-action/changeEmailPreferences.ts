"use server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import {
  LogServerAndReturnError,
  ReturnNoSession,
} from "@/lib/serverActionUtils";
import { serverSession } from "@/lib/serverSession";
import { eq } from "drizzle-orm";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import { zact } from "zact/server";
import { z } from "zod";

export const changeEmailPreferences = zact(
  z.object({ default_should_send_email: z.boolean() })
)(async (input) => {
  let session: undefined | Session;
  try {
    session = await serverSession();

    if (!session) {
      return ReturnNoSession();
    }

    await db
      .update(users)
      .set({ default_should_send_email: input.default_should_send_email })
      .where(eq(users.id, session.user.id));
  } catch (err) {
    return LogServerAndReturnError("changeEmailPreferences", err, session);
  }
  revalidatePath("/sheet/settings");
});
