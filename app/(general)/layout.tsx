import { Asap } from "next/font/google";
import NavBar from "@/components/navbar";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import Footer from "@/components/footer";
import { db } from "@/lib/db";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOption);
  const user = session?.user;

  return (
    <>
      <div>
        <NavBar user={user} />
      </div>
      <main className="min-h-[calc(100%-90px)]">{children}</main>
      <div className="pt-3">
        <Footer />
      </div>
    </>
  );
}
