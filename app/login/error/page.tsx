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
    <div className="fixed  left-[50%] top-[50%]  translate-x-[-50%]  translate-y-[-50%] w-full">
      <Card className="xs:w-[400px] w-[95%] mx-auto">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center mb-4">
            <AlertTriangle className="text-red-500 w-[50px]" />
            <CardDescription>
              Unable to login and you can retry with another options or another
              email
            </CardDescription>
          </div>
          <Button className="bg-red-500 hover:bg-red-400 text-white">
            <Link href={"/"}>Go To Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
