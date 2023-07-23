import { env } from "@/env.mjs";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export default async function sitemap() {
  const baseURL = env.NEXTAUTH_URL;
  const usersNames = await db.select({ userName: users.userName }).from(users);
  const allUserName = usersNames.map((userName) => {
    return { url: `${baseURL}/${userName.userName}`, lastModified: new Date() };
  });
  return [{ url: baseURL, lastModified: new Date() }, ...allUserName];
}
