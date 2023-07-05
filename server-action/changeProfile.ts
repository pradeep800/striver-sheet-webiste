"use server";
import { formSchema } from "@/components/formForChangingDescriptionAndName";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { zact } from "zact/server";
import { z } from "zod";

export const ChangeProfile = zact(
  z.object({
    userName: z
      .string()
      .regex(/^[a-z0-9]+$/, "Only character you can use is 0-9 and a-z")
      .min(3, { message: "Username must be at least 3 character" })
      .max(40, { message: "Username should not be more then 40 words" }),
    description: z
      .string()
      .max(200, { message: "Description should not be more then 200 words" }),
  })
)(async ({ userName, description }) => {
  const session = await getServerSession(authOption);
  if (!session || !session.user) {
    throw Error("Unauthenticated");
  }
  const [userInfo] = await db
    .select({
      leftProfileChanges: users.leftProfileChanges,
      userName: users.userName,
      description: users.description,
    })
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!userInfo.leftProfileChanges) {
    throw new Error("Profile Change Count Is 0");
  }
  if (userInfo.userName === userName && userInfo.description === description) {
    throw new Error("Same Name");
  }
  await db
    .update(users)
    .set({
      userName,
      description,
      leftProfileChanges: userInfo.leftProfileChanges - 1,
    })
    .where(eq(users.id, session.user.id));
});
