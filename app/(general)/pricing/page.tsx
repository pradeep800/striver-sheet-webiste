import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOption } from "@/lib/auth";
import { BellRing, Check, IndianRupee } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
export default async function Price() {
  const session = await getServerSession(authOption);
  const user = session?.user;
  return (
    <div className="min-h-[80vh] flex flex-wrap  justify-center items-center gap-5  pt-3">
      {!user && (
        <Card className="min-h-[500px] flex flex-col justify-center basis-[400px]  ">
          <CardHeader>
            <CardTitle>Free Plan</CardTitle>
            <CardTitle>
              <Rupee amount={0} />
            </CardTitle>

            <CardDescription>For Limited Feature</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <ListItem data={"Create Upto 150 Words Note Per Question"} />
              <ListItem data={"Heatmap"} />
              <ListItem data={"Share Profile Option"} />
              <ListItem data={"Notification For Question Revision"} />
              <ListItem data={"Feature Request"} />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/register-or-login?callback=pricing">
              <Button className="bg-red-500 hover:bg-red-400">SignIn</Button>
            </Link>
          </CardFooter>
        </Card>
      )}

      <Card className="min-h-[500px]  flex flex-col justify-center basis-[400px] ">
        <CardHeader>
          <CardTitle>ProUser Plan</CardTitle>
          <CardTitle>
            <Rupee amount={300} />
          </CardTitle>
          <CardDescription>For Unlimited Feature</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <ListItem data={"All Feature Of Free Tier"} />
            <ListItem data={"No Words Limit In Notes"} />
            <ListItem data={"Email Reminder For Question Revision"} />
            <ListItem data={"More Priority For Feature Request"} />
            <ListItem data={"Pro Badge On Your Profile"} />
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
    </div>
  );
}
