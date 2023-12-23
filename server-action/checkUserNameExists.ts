"use server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { LogServerAndReturnError, isIdentifier } from "@/lib/serverActionUtils";
import { zact } from "zact/server";
import { z } from "zod";
import { serverSession } from "@/lib/serverSession";
import { Session } from "next-auth";
type UserNameObj = {
  userName: string;
};
export const checkUserNameExists = zact(z.object({ userName: z.string() }))(
  async (input) => {
    if (input.userName.length < 3) return false;
    else {
      let session: Session | undefined;
      try {
        session = await serverSession();
        if (!session) {
          return false; //because there is already an Error
        }

        const identifier = isIdentifier(input.userName);
        if (identifier) {
          return true;
        }

        let userWithThisUserName: UserNameObj[];
        let userInfo: UserNameObj;

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
        return LogServerAndReturnError("checkUserNameExits", err, session);
      }
    }
  }
);
