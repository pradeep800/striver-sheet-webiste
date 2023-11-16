import { ChatContextProvider } from "@/components/chatContext";
import { checkQuestionNumberIsCorrect } from "@/components/pagesUtils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { users } from "@/lib/db/schema";
import { authOption } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { UserInfoContext } from "@/components/userInfoContext";
import { AiModal } from "./aiModal";
import { FullPageComponent } from "./fullPageAiComponent";
type pageProps = {
  model: boolean;
};
export default async function MainAiComponent({ model }: pageProps) {
  const session = await getServerSession(authOption);

  if (!session || !session.user || !session.user.id) {
    redirect("/");
  }
  const [userInfo] = await db
    .select({ lambdaToken: users.lambdaToken, role: users.role })
    .from(users)
    .where(eq(users.id, session.user.id));
  if (userInfo.role !== "ADMIN" && userInfo.role !== "PROUSER") {
    redirect("/");
  }
  if (!userInfo) {
    redirect("/accountDeleted");
  }
  return (
    <UserInfoContext
      image={session.user.image}
      userName={session.user.name ?? session.user.userName}
    >
      <ChatContextProvider lambdaToken={userInfo.lambdaToken}>
        {model ? <AiModal /> : <FullPageComponent />}
      </ChatContextProvider>
    </UserInfoContext>
  );
}
