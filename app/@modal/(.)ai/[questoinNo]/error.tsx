"use client";
//remove this page
import { Asap } from "next/font/google";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const asap = Asap({
  subsets: ["latin"],
});
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Card
      className={`sm:w-[400px] w-[95%] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ${asap.className}`}
    >
      <CardHeader>
        <CardTitle className="text-2xl text-red-500">Error</CardTitle>
        <CardDescription className="text-lg">
          {
            "Please check question number (1<=questionNo>=191) if everything is okay try refreshing page"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2  flex-col ">
        <Button
          className="hover:bg-red-400 bg-red-500 dark:text-white grow-[1]"
          onClick={() => {
            reset();
          }}
        >
          Refresh Page
        </Button>
      </CardContent>
    </Card>
  );
}
