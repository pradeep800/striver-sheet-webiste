import { authOption } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "1MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = (await getServerSession(authOption))?.user;

      if (!user) throw new Error("Unauthorized");

      const [userInfo] = await db
        .select({ leftProfileChanges: users.leftProfileChanges })
        .from(users)
        .where(eq(users.id, user.id));
      if (!userInfo.leftProfileChanges) {
        throw new Error("profile Change Count Is 0");
      }
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id, count: userInfo.leftProfileChanges };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      await db
        .update(users)
        .set({ leftProfileChanges: metadata.count - 1, image: file.url })
        .where(eq(users.id, metadata.userId));

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
