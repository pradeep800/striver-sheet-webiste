import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
export default function VerifyRequest() {
  return (
    <div className=" h-[100%] flex justify-center items-center mx-2 ">
      <Card className="max-w-[400px] w-[400px]">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center mb-4">
            <AlertTriangle className="text-red-500 w-[50px]" />
            <CardDescription>
              Unable To LogIn Try Again With Another Account
            </CardDescription>
          </div>
          <Button className="bg-red-500 hover:bg-red-400">
            <Link href={"/"}>Go To Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
