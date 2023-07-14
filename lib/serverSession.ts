"use server";
import { Session, getServerSession } from "next-auth";
import { authOption } from "./auth";
export async function serverSession() {
  const session = await getServerSession(authOption);
  if (!session || !session.user || !session.user.id) {
    return false;
  }
  return session;
}
