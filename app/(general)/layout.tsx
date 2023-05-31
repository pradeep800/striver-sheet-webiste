import { Asap } from "next/font/google";
import NavBar from "@/components/navbar";

const asap = Asap({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <main className="h-[calc(100%-40px)]">{children}</main>
    </>
  );
}
