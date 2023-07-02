"use client";
import Experience from "@/components/experience";
import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

export default function StartToday() {
  return (
    <div className=" flex justify-center items-center flex-col h-[90vh] max-w-[800px] mx-auto">
      <div className="sm:h-[30vh] md:h-[50vh] w-full ">
        <Suspense fallback={<Fallback />}>
          <Canvas
            className="w-[100%] hidden sm:block"
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
        <div className="sm:hidden ">
          <video
            className=" dark:hidden "
            autoPlay
            loop
            muted
            src="/video/ss-light.mp4"
          />
          <video
            className="dark:block hidden sm:hidden"
            autoPlay
            loop
            muted
            src="/video/ss-dark.mp4"
          />
        </div>
      </div>

      <div className="">
        <div className="text-xl font-bold text-center mt-3">
          Level up your interview skills in 27 days with 190 frequently asked
          questions with videos, curated for DSA interviews.
        </div>
        <div className="flex justify-center pt-4 w-[100%]">
          <Link href="/register-or-login">
            <Button className=" p-3 text-xl  bg-red-500 hover:bg-red-400">
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
