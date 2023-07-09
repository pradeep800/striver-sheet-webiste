import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ManageSubscription from "@/server-action/ManagingSubscription";

export default async function Billing() {
  return (
    <form className="my-6" action={ManageSubscription}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-red-500">Billing</CardTitle>
          <CardDescription>Change Your Payment Method Settings</CardDescription>
        </CardHeader>

        <CardContent className="">
          <Button className="bg-red-500 hover:bg-red-400 dark:text-white">
            Manage Subscription
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
