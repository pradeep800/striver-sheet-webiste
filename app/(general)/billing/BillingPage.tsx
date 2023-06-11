import { Button } from "@/components/ui/button";
import ManageSubscription from "./ManagingSubscription";
import { SessionUser } from "@/types/next-auth";
import Confetti from "@/components/confetti";

export default function BillingPage() {
  return (
    <div>
      <form action={ManageSubscription}>
        <h1>Billing</h1>
        <Button type="submit">Manage Subscription</Button>
      </form>
    </div>
  );
}
