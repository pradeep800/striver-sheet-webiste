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
import { useRouter } from "next/navigation";
export default function Example() {
  const router = useRouter();
  return (
    <div className="w-full min-h-[80vh] relative">
      <Card className="w-[95%] sm:w-[500px] absolute  left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>internal server error</CardDescription>
        </CardHeader>
        <CardContent className="">
          <p>
            Please check url if you think everything is fine you can report this
            bug
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            className="hover:bg-red-400 bg-red-500 dark:text-white w-[100%]"
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </Button>
          <Button
            className="hover:bg-red-400 bg-red-500 dark:text-white w-[100%]"
            onClick={() => {
              router.push("/feedback?type=bug");
            }}
          >
            Report Bug
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
