"use client";
import Experience from "@/components/experience";
import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { Coda, Roboto } from "next/font/google";
const poppins = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});
export default function StartToday() {
  return (
    <section
      className={`space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 min-h-[95vh] flex items-center justify-center ${poppins.className}`}
    >
      <div className="container flex max-w-[64rem]  flex-col items-center  gap-4 text-center">
        <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-red-500">
          Practice dsa question in structure manner
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
