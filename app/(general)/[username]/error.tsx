"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function UserNotFound() {
  const router = useRouter();
  return (
    <div className=" w-full min-h-[80vh] flex items-center  justify-center">
      <Card className=" w-[95%] xs:w-[500px]">
        <CardHeader>
          <CardTitle>No User</CardTitle>
          <CardDescription>No user with this name</CardDescription>
        </CardHeader>
        <CardContent className="">
          <p>{`Unable to find user please go home`}</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            className="hover:bg-red-400 bg-red-500 dark:text-white w-[100%]"
            onClick={() => {
              router.push("/");
            }}
          >
            Go Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
