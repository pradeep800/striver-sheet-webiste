"use server";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { zact } from "zact/server";
import { z } from "zod";

export const changeEmailPreferences = zact(
  z.object({ default_should_send_email: z.boolean() })
)(async (input) => {
  const session = await getServerSession(authOption);
  if (!session || !session.user) {
    return {
      error:
        "Please login or if you already login please signout and then login",
    };
  }
  try {
    await db
      .update(users)
      .set({ default_should_send_email: input.default_should_send_email })
      .where(eq(users.id, session.user.id));
  } catch (err) {
    console.log(
      `Unable to update default_should send email of id ${session.user.id} `
    );
    return {
      error: "Unable to update settings",
    };
  }
  revalidatePath("/sheet/settings");
});
