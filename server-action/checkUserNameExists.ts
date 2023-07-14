"use server";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { identifiers } from "@/static/identifier";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { isIdentifier } from "@/lib/serverActionUtils";
import { zact } from "zact/server";
import { z } from "zod";
type UserNameObj = {
  userName: string;
};
export const checkUserNameExists = zact(z.object({ userName: z.string() }))(
  async (input) => {
    if (input.userName.length < 3) return false;
    else {
      const session = await getServerSession(authOption);
      if (!session || !session?.user) {
        return false; //because there is already an Error
      }

      const identifier = isIdentifier(input.userName);
      if (identifier) {
        return true;
      }

      let userWithThisUserName: UserNameObj[];
      let userInfo: UserNameObj;
      try {
        [userInfo] = await db
          .select({ userName: users.userName })
          .from(users)
          .where(eq(users.id, session.user.id));

        userWithThisUserName = await db
          .select({ userName: users.userName })
          .from(users)
          .where(eq(users.userName, input.userName));

        if (userWithThisUserName.length) {
          if (userInfo.userName == input.userName) {
            return false;
          } //User is Sending Request for His Name
          return true;
        }
        return false;
      } catch (err) {
        const error = err as Error;
        console.log(
          `Error on checkUserNameExists on id ${session.user.id} and error is ${error.message}`
        );
        return { error: "Internal Server Error" };
      }
    }
  }
);
