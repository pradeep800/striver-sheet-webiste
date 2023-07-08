import NavBar from "@/components/navbar";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import Footer from "@/components/footer";
import { Provider } from "@/components/sessionProvider";
import ToastRedirect from "@/components/toastRedirect";
import Confetti from "@/components/confetti";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOption);
  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <Provider>
      <div>
        <NavBar user={session.user} />
      </div>
      <ToastRedirect />
      <main className="min-h-[85vh]">{children}</main>
      <div className="pt-3">
        <Footer />
      </div>

      <Confetti />
    </Provider>
  );
}
