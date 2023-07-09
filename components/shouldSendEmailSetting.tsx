"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { changeEmailPreferences } from "@/server-action/changeEmailPreferences";
import { SessionUser } from "@/types/next-auth";
import { useEffect, useState } from "react";
import { experimental_useOptimistic as useOptimistic } from "react";
import { toast } from "./ui/use-toast";
type Props = {
  user: SessionUser;
  emailReminder: boolean;
};
export default function ShouldSendEmailSetting({ user, emailReminder }: Props) {
  const [optimisticShouldRemind, setOptimisticShouldRemind] = useOptimistic(
    emailReminder,
    (state, shouldRemind: boolean) => {
      return shouldRemind;
    }
  );
  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle className="text-2xl text-red-500">Email Reminder</CardTitle>
        <CardDescription>
          You can change your preference on email option should will shown in
          reminder option or not
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Switch
          checked={optimisticShouldRemind}
          onCheckedChange={async (e) => {
            try {
              setOptimisticShouldRemind(e.valueOf());
              await changeEmailPreferences({
                id: user.id,
                email_reminder: e.valueOf(),
              });
            } catch (err) {
              const error = err as Error;
              console.log(error.message);
              toast({ title: error.message, variant: "destructive" });
            }
          }}
        />
      </CardContent>
    </Card>
  );
}
