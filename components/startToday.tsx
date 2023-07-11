"use client";
import Experience from "@/components/experience";
import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
});
export default function StartToday() {
  return (
    <div className=" flex justify-center items-center flex-col h-[90vh] max-w-[800px] mx-auto">
      <div className="md:h-[60vh]  w-full sm:h-[50vh] xs:h-[40vh] ">
        <Suspense fallback={<Fallback />}>
          <Canvas
            className="w-[100%] sm:block hidden"
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [4, -2, 6],
            }}
          >
            <Experience />
          </Canvas>
        </Suspense>
        <div className="sm:hidden">
          <video
            className=" dark:hidden xs:h-[40vh] h-[35vh] object-cover "
            autoPlay
            loop
            muted
            src="/video/ss-light.mp4"
          />
          <video
            className="dark:block hidden sm:hidden xs:h-[40vh] h-[35vh] object-cover"
            autoPlay
            loop
            muted
            src="/video/ss-dark.mp4"
          />
        </div>
      </div>

      <div className="">
        <div
          className={` font-medium text-xl text-center mt-3 ${poppins.className} `}
        >
          Level up your interview skills in 27 days with 191 frequently asked
          questions with videos, curated for DSA interviews.
        </div>
        <div className="flex justify-center pt-4 w-[100%]">
          <Link href="/login">
            <Button className=" p-3 text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black hover:text-black dark:hover:text-gray-800 dark:text-gray-800">
              Start Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
function Fallback() {
  return <Skeleton className="w-full h-full animate-pulse" />;
}
