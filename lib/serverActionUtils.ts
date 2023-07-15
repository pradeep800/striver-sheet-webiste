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
  actionName: string,
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
  const date = new Date().toISOString();
  console.log(
    `Error on ${actionName} on id ${userId} and error is ${error.message} on date ${date}`
  );
  return { error: "Please try again" };
}

export function ReturnNoSession() {
  return {
    error: "Your not login",
  };
}

export function ReturnDeletedAccount() {
  return {
    error:
      "You deleted this account from another device please logout and create new account",
  };
}
