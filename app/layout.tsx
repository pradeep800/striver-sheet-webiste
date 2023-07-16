import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import "@/styles/editor.css"; //not working in motals
import { Asap } from "next/font/google";
import { Metadata } from "next";
import { NextThemeProvider } from "@/components/theme-provider";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";
const asap = Asap({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://striversheet.pradeepbisht.com"),
  title: {
    default: "Striver Sheet",
    template: "%s | Striver Sheet",
  },
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
    images: ["https://striversheet.pradeepbisht.com/opengraph-image.jpg"],
    url: "https://striversheet.pradeepbisht.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Striver Sheet",
    description:
      "Level up your interview skills in 27 days with 191 frequently asked questions with videos, curated for DSA interviews.",
    images: ["https://striversheet.pradeepbisht.com/opengraph-image.jpg"],

    creator: "@pradeep8b0",
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
