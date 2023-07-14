import { identifiers } from "@/static/identifier";
import { Session } from "next-auth";

export function isIdentifier(name: string) {
  for (let i = 0; i < identifiers.length; i++) {
    if (identifiers[i] === name) {
      return true;
    }
  }
  return false;
}

export function LogServerAndReturn(
  err: unknown,
  session: Session | boolean | undefined
) {
  const error = err as Error;
  let userId: string;
  //session can be undefine also if fetch call failed on getting server session
  if (typeof session !== "boolean" && session) {
    userId = session.user.id;
  } else {
    userId = "(not define)";
  }
  console.log(
    `Error on checkUserNameExists on id ${userId} and error is ${error.message}`
  );
  return { error: "Internal Server Error" };
}
