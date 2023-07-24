import MainAdminFeedback from "@/components/mainAdminFeedback";

import { db } from "@/lib/db";
import { feedbacks as fbs, users } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export default async function AdminFeedback() {
  const feedbacks = await db
    .select({
      userName: users.userName,
      email: fbs.mail,
      content: fbs.content,
      type: fbs.type,
      name: users.name,
      role: fbs.user_role,
    })
    .from(fbs)
    .innerJoin(users, eq(users.id, fbs.user_id))
    .orderBy(sql`${fbs.created_at},${fbs.user_role}`);

  return <MainAdminFeedback feedbacks={feedbacks} />;
}
