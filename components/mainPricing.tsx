"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BuyProSubscription } from "@/server-action/buyProSubscription";
import Link from "next/link";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { Check, IndianRupee } from "lucide-react";
import { useState } from "react";
import Loading from "./svg/loading";
type Props = {
  sessionUser: Session["user"] | undefined;
};
export default function MainPricing({ sessionUser }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-[80vh] flex flex-wrap   justify-center items-center gap-5  pt-3">
      {!sessionUser && (
        <Card className="min-h-[500px]  xs:w-[400px] flex flex-col justify-center basis-[400px]  ">
          <CardHeader>
            <CardTitle>Free Plan</CardTitle>
            <CardTitle>
              <Rupee amount={0} />
            </CardTitle>

            <CardDescription>For Limited Feature</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <ListItem data={"Basic primitives for notes"} />
              <ListItem data={"Share Profile Option"} />
              <ListItem
                data={"Notification For Question Revision (in website)"}
              />
              <ListItem data={"Profile Can Be Change 2 Times"} />
              <ListItem data={"Feature Request"} />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/login?callback=%2Fpricing" className="w-[100%]">
              <Button className="bg-red-500 hover:bg-red-400 dark:text-white w-[100%] ">
                SignIn
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
      <div>
        <Card className="min-h-[500px]  xs:w-[400px]  flex flex-col justify-center basis-[400px] ">
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
              <ListItem
                data={"Notes which includes table,heading and many more"}
              />
              <ListItem data={"Email Reminder For Question Revision"} />
              <ListItem data={"Get +3 Profile Changes"} />
              <ListItem data={"More Priority For Feature Request"} />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="bg-red-500 hover:bg-red-400 dark:text-white w-[100%]"
              onClick={async () => {
                setLoading(true);
                try {
                  const actionRes = await BuyProSubscription();

                  if (typeof actionRes === "object" && "error" in actionRes) {
                    //inference is not working here idk why (type narrowing)
                    toast({ title: actionRes.error, variant: "destructive" });
                  } else {
                    if (actionRes.url) {
                      router.push(actionRes.url);
                    } else {
                      toast({
                        title:
                          "Unable to create stripe checkout please try again",
                        variant: "destructive",
                      });
                    }
                  }
                } catch (err) {
                  toast({
                    title: "Unable to create stripe checkout please try again",
                    variant: "destructive",
                  });
                } finally {
                  setLoading(false);
                }
              }}
            >
              {loading && <Loading />}
              <span className="pl-2">Buy Now</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function ListItem({ data }: { data: string }) {
  return (
    <div className="flex gap-3">
      <div className="min-w-[20px] h-[20px]">
        <Check className="w-[100%] h-[100%] text-green-700" />
      </div>
      <p className="">{data}</p>
    </div>
  );
}
function Rupee({ amount }: { amount: number }) {
  return (
    <div className="flex text-2xl  items-baseline">
      <div className="text-5xl flex items-baseline ">
        {amount}
        <IndianRupee />
      </div>
      /month
    </div>
  );
}
