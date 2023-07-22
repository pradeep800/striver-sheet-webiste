"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Open_Sans } from "next/font/google";
const openSans = Open_Sans({
  subsets: ["latin"],
});
export default function StartToday() {
  return (
    <section
      className={`space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 min-h-[60vh] sm:min-h-[90vh]  flex items-center justify-center ${openSans.className}`}
    >
      <div className="container flex max-w-[64rem]  flex-col items-center  gap-4 text-center">
        <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-red-500">
          Practice dsa questions in structure manner
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Level up your interview skills in 27 days with 191 frequently asked
          questions with videos, curated for DSA interviews.
        </p>
        <Button className="space-x-4 bg-red-500 hover:bg-red-400 dark:text-white">
          <Link href="/login">Get Started</Link>
        </Button>
      </div>
    </section>
  );
}
