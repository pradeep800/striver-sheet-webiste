import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Asap } from "next/font/google";
import { Metadata } from "next";
import UpdateRole from "@/lib/useUpdateRole";
import { Provider } from "@radix-ui/react-toast";

const asap = Asap({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Striver's Sheet",
  icons: {
    icon: "/ss.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${asap.className} scrollbar`}>
        <main className="h-[100%] p-3">{children}</main> <Toaster />
        <canvas id="confetti" />
      </body>
    </html>
  );
}
