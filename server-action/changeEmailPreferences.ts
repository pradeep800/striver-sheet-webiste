"use server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { zact } from "zact/server";
import { z } from "zod";

export const changeEmailPreferences = zact(
  z.object({ id: z.string(), default_should_send_email: z.boolean() })
)(async (input) => {
  console.log(input);
  try {
    await db
      .update(users)
      .set({ default_should_send_email: input.default_should_send_email })
      .where(eq(users.id, input.id));
  } catch (err) {
    throw new Error("Unable to change your settings");
  }
  revalidatePath("/sheet/settings");
});
