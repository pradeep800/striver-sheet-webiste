import MainProfileChange from "@/components/mainProfileChange";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOption);
  if (!session || !session.user) {
    redirect("/");
  }
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!user) {
    throw new Error("account deleted");
  }
  return <MainProfileChange user={user} />;
}
