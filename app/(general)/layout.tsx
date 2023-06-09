import NavBar from "@/components/navbar";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import Footer from "@/components/footer";
import { Provider } from "@/components/sessionProvider";
import ToastRedirect from "@/components/toastRedirect";
import ReactCanvasConfetti from "react-canvas-confetti";

let animationInstance;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOption);
  const user = session?.user;

  return (
    <Provider>
      <div>
        <NavBar user={user} />
      </div>
      <main className="min-h-[calc(100%-90px)]">{children}</main>
      <div className="pt-3">
        <Footer />
      </div>
      <ToastRedirect />
    </Provider>
  );
}
