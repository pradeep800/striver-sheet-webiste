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
      className={`space-y-6 p-3  min-h-[60vh] sm:min-h-[90vh]  flex items-center justify-center ${openSans.className}`}
    >
      <div className=" flex max-w-[900px]   flex-col items-center  gap-4 text-center">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-red-500 font-bold">
          Practice DSA questions in structure manner in 27 days.
        </h1>
        <p className=" max-w-[250px] xs:max-w-[350px] sm:max-w-[500px] lg:max-w-[700px] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Prepare for interviews with our 27-day plan, curated questions, and AI
          assistant. Track progress, take notes, and set reminders all in one
          place for effective readiness.
        </p>
        <Link href="/login">
          <Button className="space-x-4 bg-red-500 hover:bg-red-400 dark:text-white">
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  );
}
