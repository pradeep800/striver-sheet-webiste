import { ChatContextProvider } from "@/components/chatContext";
import { checkQuestionNumberIsCorrect } from "@/components/pagesUtils";
import MainAiComponent from "./mainAiComponent";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { users } from "@/lib/db/schema";
import { authOption } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { useUserInfo } from "@/lib/useUserInfo";
type pageProps = {
  params: Record<string, string>;
};
export default async function AiPage({ params }: pageProps) {
  const { questionNo: questionNumberInString } = params;
  const questionNumber = parseInt(questionNumberInString);
  checkQuestionNumberIsCorrect(questionNumber);
  const session = await getServerSession(authOption);

  if (!session || !session.user || !session.user.id) {
    redirect("/");
  }
  useUserInfo.setState({ userInfo: session.user });
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
    <ChatContextProvider
      lambdaToken={userInfo.lambdaToken}
      questionNumber={questionNumber}
    >
      <MainAiComponent questionNumber={questionNumber} />
    </ChatContextProvider>
  );
}
