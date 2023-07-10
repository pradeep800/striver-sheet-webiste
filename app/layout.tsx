import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Asap } from "next/font/google";
import { Metadata } from "next";
import { NextThemeProvider } from "@/components/theme-provider";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";
const asap = Asap({ subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL("https://striversheet.pradeepbisht.com"),
  title: "Striver's Sheet",
  icons: {
    icon: "/ss.png",
  },

  openGraph: {
    title: "Striver Sheet",
    type: "website",
    locale: "en_US",
    siteName: "Striver Sheet",
    description:
      "Level up your interview skills in 27 days with 191 frequently asked questions with videos, curated for DSA interviews.",
    images: [
      {
        url: "https://striversheet.pradeepbisht.com/opengraph-image.jpg",
        width: 1200,
        height: 518,
      },
    ],
    url: "https://striversheet.pradeepbisht.com",
  },
  twitter: {
    title: "Striver Sheet",
    description:
      "Level up your interview skills in 27 days with 191 frequently asked questions with videos, curated for DSA interviews.",
    images: [
      {
        url: "https://striversheet.pradeepbisht.com/opengraph-image.jpg",
        width: 1200,
        height: 518,
      },
    ],
    creator: "@pradeep14880712",
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
      <head />
      <body className={`${asap.className} scrollbar`}>
        <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextTopLoader />
          <main className="min-h-[100%] p-3 dark:bg-background">
            {children}
          </main>
        </NextThemeProvider>
        <Toaster />
        <VercelAnalytics />
        {modal}
      </body>
    </html>
  );
}
