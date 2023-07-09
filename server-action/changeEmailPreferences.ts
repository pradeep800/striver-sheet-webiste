"use server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { zact } from "zact/server";
import { z } from "zod";

export const changeEmailPreferences = zact(
  z.object({ id: z.string(), email_reminder: z.boolean() })
)(async (input) => {
  console.log(input);
  try {
    await db
      .update(users)
      .set({ email_reminders: input.email_reminder })
      .where(eq(users.id, input.id));
  } catch (err) {
    throw new Error("Unable to change your settings");
  }
  revalidatePath("/sheet/settings");
});
