import NavBar from "@/components/navbar";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import Footer from "@/components/footer";
import { Provider } from "@/components/sessionProvider";
import ToastRedirect from "@/components/toastRedirect";
import Confetti from "@/components/confetti";

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const session = await getServerSession(authOption);
  const user = session?.user;
  console.log("less then top", modal);
  return (
    <Provider>
      <div>
        <NavBar user={user} />
      </div>
      <ToastRedirect />
      <main className="min-h-[calc(100%-90px)]">{children}</main>
      <div className="pt-3">
        <Footer />
      </div>
      {modal}
      <Confetti />
    </Provider>
  );
}
