"use server";
import { formSchema } from "@/components/formForChangingDescriptionAndName";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { and, eq, ne } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { zact } from "zact/server";
import { ChangeProfileType } from "./zodType/changeProfileSchema";
import { isIdentifier } from "@/lib/isIdentifier";
import { redirect } from "next/navigation";
import { absoluteUrl } from "@/lib/utils";
import { DbUser } from "@/lib/db/types";
import { z } from "zod";
export const ChangeProfile = zact(ChangeProfileType)(
  async ({ userName, description }) => {
    const session = await getServerSession(authOption);
    if (!session || !session.user) {
      return {
        error:
          "Please login or if you already login please signout and then login",
      };
    }

    //checking if username is identifier
    const identifier = isIdentifier(userName);
    if (identifier) {
      return { error: "Please choose different name" };
    }

    let userInfo: Pick<
      DbUser,
      "userName" | "leftProfileChanges" | "id" | "description"
    >;
    try {
      [userInfo] = await db
        .select({
          leftProfileChanges: users.leftProfileChanges,
          userName: users.userName,
          description: users.description,
          id: users.id,
        })
        .from(users)
        .where(eq(users.id, session.user.id))
        .limit(1);
    } catch (err) {
      const error = err as Error;
      console.log(
        `Unable to get user info from id ${session.user.id} for changing profile and error is ${error.message}`
      );
      return { error: "Internal Server Error" };
    }

    if (!userInfo) {
      return {
        error: `Your account is deleted please signout by going ${absoluteUrl(
          "/api/auth/signout"
        )}`,
      };
    }
    if (!userInfo.leftProfileChanges) {
      return { error: `You don't have enough profile changes left` };
    }
    if (
      userInfo.userName === userName &&
      userInfo.description === description
    ) {
      return { error: `Please make changes for saving info` };
    }

    //checking if name already Exists
    const PeopleWhoHaveThisUserName = await db
      .select({ id: users.id })
      .from(users)
      .where(and(eq(users.userName, userName), ne(users.id, userInfo.id)))
      .limit(1);
    if (PeopleWhoHaveThisUserName.length) {
      return {
        error: "User already exits with this name",
      };
    }

    try {
      await db
        .update(users)
        .set({
          userName,
          description,
          leftProfileChanges: userInfo.leftProfileChanges - 1,
        })
        .where(eq(users.id, session.user.id));
    } catch (err) {
      const error = err as Error;
      console.log(
        `Unable to update profile information in changeProfile with id ${session.user.id} and error message is ${error.message}`
      );
      return { error: "Internal Server Error" };
    }
  }
);
