"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Socials } from "@/components/socials";
export default function AboutPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-3">
      <Card className="max-w-[600px]">
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            Hi,
            <div className="inline-block   text-2xl  origin-middle-hand animate-wave transform-origin  z-[-1]">
              👋
            </div>
            <p className="hyphens-auto  ">
              We are team of web enthusiasts name Pradeep Singh Pawan Bisht and
              Pawan Fartyal. We love making cool website from dehradun
              Uttarakhand, if you have need web projects or need hard working
              folks to help please reach out to us we are all about creating
              awesome web stuff that stick in people minds
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-5 text-red-500">
          <Socials />
        </CardFooter>
      </Card>
    </div>
  );
}
