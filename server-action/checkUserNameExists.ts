"use server";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { identifiers } from "@/static/identifier";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { isIdentifier } from "@/lib/isIdentifier";
import { zact } from "zact/server";
import { z } from "zod";

export const checkUserNameExists = zact(z.object({ userName: z.string() }))(
  async ({ userName }) => {
    if (userName.length < 3) return false;
    else {
      const session = await getServerSession(authOption);
      if (!session || !session?.user) {
        return false; //because there is already an Error
      }
      const identifier = isIdentifier(userName);
      if (identifier) {
        return true;
      }
      const [userInfo] = await db
        .select({ name: users.userName })
        .from(users)
        .where(eq(users.id, session.user.id));

      const data = await db
        .select({ name: users.userName })
        .from(users)
        .where(eq(users.userName, userName));

      if (data.length) {
        if (userInfo.name == userName) {
          return false;
        } //User is Sending Request for His Name
        return true;
      }
      return false;
    }
  }
);
