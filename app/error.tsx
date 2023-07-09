"use client";

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
  if (error.message === "account deleted") {
    return <AccountDeleted />;
  }
  return <ServerError errorMessage={error.message} reset={reset} />;
}
function ServerError({
  errorMessage,
  reset,
}: {
  errorMessage: string;
  reset: () => void;
}) {
  return (
    <Card className="sm:w-[400px] w-[95%] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
      <CardHeader>
        <CardTitle className="text-2xl text-red-500">
          There Is Some Kind Error
        </CardTitle>
        <CardDescription>
          {"Error message :- "}
          {errorMessage}
        </CardDescription>
        <CardDescription>
          <Link
            className="text-red-500 hover:text-red-400 hover:underline hover:decoration-red-500"
            href="/feedback"
          >
            report
          </Link>{" "}
          this error
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 xs:flex-row flex-col">
        <Button
          className="hover:bg-red-400 bg-red-500 dark:text-white grow-[1]"
          onClick={() => {
            reset();
          }}
        >
          Reset
        </Button>
        <Button
          className="hover:bg-red-400 bg-red-500 dark:text-white grow-[1]"
          onClick={() => {
            signOut();
          }}
        >
          SignOut
        </Button>
      </CardContent>
    </Card>
  );
}
function AccountDeleted() {
  return (
    <Card className="sm:w-[400px] w-[95%] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
      <CardHeader>
        <CardTitle className="text-2xl text-red-500">
          Account Is Deleted{" "}
        </CardTitle>
        <CardDescription>
          you have deleted this account. Now you have to signout from deleted
          account and if you may want you can create new account with same or
          different email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="hover:bg-red-400 bg-red-500 dark:text-white"
          onClick={() => {
            signOut();
          }}
        >
          Signout
        </Button>
      </CardContent>
    </Card>
  );
}
