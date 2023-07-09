"use client";
import { SessionUser } from "@/types/next-auth";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { useState, useTransition } from "react";
import { deleteAccount } from "@/server-action/deleteAccount";
import Loading from "./svg/loading";

import { signOut } from "next-auth/react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
type Props = {
  user: SessionUser;
};
export default function DeleteAccount({}: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle className="text-2xl text-red-500 ">
          Delete Your Account
        </CardTitle>
        <CardDescription>
          Deleting your account means all your information will be permanently
          erased from our databases, and it cannot be recovered. Please be aware
          of this irreversible action before proceeding.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="bg-red-500 hover:bg-red-400 text-white"
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete Your Account
        </Button>
      </CardContent>
      <Alert open={open} setOpen={setOpen} />
    </Card>
  );
}
type AlertDialog = {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
};
function Alert({ open, setOpen }: AlertDialog) {
  const [loading, setLoading] = useState(false);
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="">
            Deleting your account means all your information will be permanently
            erased from our databases, and it cannot be recovered. Please be
            aware of this irreversible action before proceeding.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              if (!loading) {
                setOpen(false);
              }
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            className="bg-red-500 hover:bg-red-400 dark:text-white "
            onClick={async () => {
              setLoading(true);
              if (!loading) {
                try {
                  await deleteAccount({});
                  await signOut();
                } catch (err) {
                  const error = err as Error;
                  toast({
                    title: "Unable to Delete Your account",
                    variant: "destructive",
                  });
                  console.log(error.message);
                }
              }
              setLoading(false);
            }}
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}