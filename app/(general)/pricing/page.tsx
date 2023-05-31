import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BellRing, Check, IndianRupee } from "lucide-react";
import Link from "next/link";
export default function Price() {
  return (
    <div className="h-[100%] flex flex-wrap  justify-center items-center gap-5 mt-4 md:mt-0">
      <Card className="min-h-[500px] flex flex-col justify-center basis-[400px]  ">
        <CardHeader>
          <CardTitle>Free Tier</CardTitle>
          <CardTitle>
            <Rupee amount={0} />
          </CardTitle>

          <CardDescription>For Limited Feature</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <ListItem data={"One Note Per Question"} />
            <ListItem data={"Heatmap"} />
            <ListItem data={"Feature Request"} />
            <ListItem data={"Persistance Data"} />
            <ListItem data={"Notification For Question Revision"} />
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/register-or-login">
            <Button className="bg-red-500 hover:bg-red-400">SignIn</Button>
          </Link>
        </CardFooter>
      </Card>
      <Card className="min-h-[500px]  flex flex-col justify-center basis-[400px] ">
        <CardHeader>
          <CardTitle>ProUser Plan</CardTitle>
          <CardTitle>
            <Rupee amount={30} />
          </CardTitle>
          <CardDescription>For Unlimited Feature</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <ListItem data={"All Feature Of Free Tier"} />
            <ListItem data={"Infinite Notes Per Question"} />
            <ListItem data={"Email Reminder For Question Revision"} />
            <ListItem data={"More Priority For Feature Request"} />
            <ListItem data={"Cancel Subscription Anytime"} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="bg-red-500 hover:bg-red-400">Buy Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
function ListItem({ data }: { data: string }) {
  return (
    <div className="flex gap-3">
      <Check />
      <p>{data}</p>
    </div>
  );
}
function Rupee({ amount }: { amount: number }) {
  return (
    <div className="flex text-2xl items-center">
      {amount}
      <IndianRupee />
      /month
    </div>
  );
}
