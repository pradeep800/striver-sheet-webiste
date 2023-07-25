import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
type Props = {
  className?: string;
};
export default function Danger({ className }: Props) {
  return (
    <div className={` max-w-[800px] mx-auto  ${className} `}>
      <div className="flex justify-center items-center gap-2 text-red-500 mb-4">
        <AlertTriangle />
        <h1 className="font-bold text-center text-2xl tracking-wide">Alerts</h1>
      </div>
      <div className="flex gap-4 justify-center flex-col md:flex-row items-center md:items-stretch ">
        <Card className="max-w-[400px]">
          <CardHeader>
            <CardTitle>Only For Project Purpose</CardTitle>
          </CardHeader>
          <CardContent>
            {
              "I thought of this idea when striver sheet store data in localStorage but now striver sheet have database and everything so you might want to choose real striver sheet"
            }
          </CardContent>
        </Card>
        <Card className="max-w-[400px] ">
          <CardHeader>
            <CardTitle className="">
              This Project Is Working On Test Mode
            </CardTitle>
          </CardHeader>
          <CardContent className={`  text-base`}>
            This mean that you can get ProUser Plan excess with{" "}
            <Link
              className="text-red-500 hover:text-red-400 hover:underline  hover:decoration-red-500  "
              href="https://stripe.com/docs/testing"
              target="_blank"
            >
              test card
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
