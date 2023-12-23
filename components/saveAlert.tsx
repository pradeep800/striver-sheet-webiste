"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
type Props = {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  back?: () => void;
};
export default function Alert({ open, back, setOpen }: Props) {
  const [isCancel, setIsCancel] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (isCancel) {
      back ? back() : router.back();
    }
  }, [isCancel]);
  return (
    <AlertDialog
      open={open}
      onOpenChange={(e) => {
        setOpen(false);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save Page</AlertDialogTitle>
          <AlertDialogDescription>
            {"Don't forget to save your page."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setIsCancel(false);
            }}
          >
            {" "}
            Yet To Save
          </AlertDialogCancel>
          <AlertDialogAction
            className="dark:text-white bg-red-500 hover:bg-red-400"
            onClick={() => {
              setIsCancel(true);
            }}
          >
            Already Saved
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
