"use client";
//remove this page
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Card className="sm:w-[400px] w-[95%] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
      <CardHeader>
        <CardTitle className="text-2xl text-red-500">Server error</CardTitle>
        <CardDescription>
          {
            "Please refresh this page and if still not working please logout and login again"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2  flex-col">
        <Button
          className="hover:bg-red-400 bg-red-500 dark:text-white grow-[1]"
          onClick={() => {
            reset();
          }}
        >
          Refresh Page
        </Button>
        <Button
          className="hover:bg-red-400 bg-red-500 dark:text-white grow-[1]"
          onClick={() => {
            signOut();
          }}
        >
          LogOut
        </Button>
      </CardContent>
    </Card>
  );
}
