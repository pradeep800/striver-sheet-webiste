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
  default_should_send_email: boolean;
};
export default function ShouldSendEmailSetting({
  user,
  default_should_send_email,
}: Props) {
  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle className="text-2xl text-red-500">Email Reminder</CardTitle>
        <CardDescription>
          You can change your preference on what should be your default email
          reminder option
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Switch
          checked={default_should_send_email}
          onCheckedChange={async (e) => {
            try {
              const actionRes = await changeEmailPreferences({
                default_should_send_email: e.valueOf(),
              });
              if (actionRes?.error) {
                toast({ title: actionRes.error, variant: "destructive" });
              } else {
                toast({
                  title: `default reminder option is ${!default_should_send_email}`,
                });
              }
            } catch (err) {
              toast({ title: "Server Error", variant: "destructive" });
            }
          }}
        />
      </CardContent>
    </Card>
  );
}
