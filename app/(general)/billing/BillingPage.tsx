import { Button } from "@/components/ui/button";
import ManageSubscription from "@/server-action/ManagingSubscription";

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
