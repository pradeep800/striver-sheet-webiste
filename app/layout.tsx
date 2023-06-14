import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Asap } from "next/font/google";
import { Metadata } from "next";
import { NextThemeProvider } from "@/components/theme-provider";
const asap = Asap({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Striver's Sheet",
  icons: {
    icon: "/ss.png",
  },
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${asap.className} scrollbar`}>
        <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="h-[100%] p-3 dark:bg-black">{children}</main>
        </NextThemeProvider>
        <Toaster />
        {modal}
      </body>
    </html>
  );
}
