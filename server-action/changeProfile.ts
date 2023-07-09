"use server";
import { formSchema } from "@/components/formForChangingDescriptionAndName";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { and, eq, ne } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { zact } from "zact/server";
import { z } from "zod";
import { ChangeProfileType } from "./zodType/changeProfileSchema";
import { isIdentifier } from "@/lib/isIdentifier";
import { signOutAction } from "@/app/example/seraction";
import { redirect } from "next/navigation";

export const ChangeProfile = zact(ChangeProfileType)(
  async ({ userName, description }) => {
    const session = await getServerSession(authOption);
    if (!session || !session.user) {
      throw Error("Unauthenticated");
    }
    //checking if username is identifier
    const identifier = isIdentifier(userName);
    if (identifier) {
      throw Error("Please Try Different Name");
    }

    const [userInfo] = await db
      .select({
        leftProfileChanges: users.leftProfileChanges,
        userName: users.userName,
        description: users.description,
        id: users.id,
      })
      .from(users)
      .where(eq(users.id, session.user.id));
    if (!userInfo) {
      signOutAction();
      redirect("/login");
    }
    if (!userInfo.leftProfileChanges) {
      throw new Error("Profile Change Count Is 0");
    }
    if (
      userInfo.userName === userName &&
      userInfo.description === description
    ) {
      throw new Error("Same Name and Same Description");
    }

    //checking if name already Exists
    const PeopleWhoHaveThisUserName = await db
      .select({ id: users.id })
      .from(users)
      .where(and(eq(users.userName, userName), ne(users.id, userInfo.id)))
      .limit(1);
    if (PeopleWhoHaveThisUserName.length) {
      throw Error("This Name Already Exists");
    }

    await db
      .update(users)
      .set({
        userName,
        description,
        leftProfileChanges: userInfo.leftProfileChanges - 1,
      })
      .where(eq(users.id, session.user.id));
  }
);
