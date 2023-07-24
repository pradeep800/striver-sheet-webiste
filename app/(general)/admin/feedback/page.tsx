import MainAdminFeedback from "@/components/mainAdminFeedback";

import { db } from "@/lib/db";
import { feedbacks as fbs, users } from "@/lib/db/schema";
import { maxFeedback } from "@/static/infiniteScrolling";
import { eq, sql } from "drizzle-orm";

export default async function AdminFeedback() {
  const feedbacks = await db
    .select({
      id: fbs.id,
      userName: users.userName,
      email: fbs.mail,
      content: fbs.content,
      type: fbs.type,
      name: users.name,
      role: fbs.user_role,
      created: fbs.created_at,
    })
    .from(fbs)
    .innerJoin(users, eq(users.id, fbs.user_id))
    .orderBy(sql`${fbs.created_at} desc,${fbs.user_role}`)
    .limit(maxFeedback);

  const [{ totalFeedbacks: total }] = await db
    .select({ totalFeedbacks: sql`count(${fbs.id})` })
    .from(fbs);

  const totalFeedbacks = parseInt(total as string);

  if (isNaN(totalFeedbacks)) {
    throw new Error("not able to count");
  }
  if (totalFeedbacks === 0) {
    return (
      <div className="h-[80vh] max-w-[800px] mx-auto w-full flex justify-center items-center">
        No Reminder
      </div>
    );
  }

  return (
    <MainAdminFeedback feedbacks={feedbacks} totalFeedbacks={totalFeedbacks} />
  );
}
