"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Example() {
  const router = useRouter();
  return (
    <div className="w-[500px] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
      <Card>
        <CardHeader>
          <CardTitle>Account Deleted</CardTitle>
          <CardDescription>
            it seems like you have deleted your account from another device
          </CardDescription>
        </CardHeader>
        <CardContent className="font-medium ">
          <p>For creating a new account or going to home page please signout</p>
        </CardContent>
        <CardFooter>
          <Button
            className="hover:bg-red-400 bg-red-500 dark:text-white w-[100%]"
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
          >
            Signout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
