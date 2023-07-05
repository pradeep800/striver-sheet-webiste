"use client";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { DbUser } from "@/lib/db/types";
import { FormEvent, useEffect, useId, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import "@uploadthing/react/styles.css";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "./ui/use-toast";
import UDFrom from "./formForChangingDescriptionAndName";
type Props = {
  user: DbUser;
};
export default function MainSetting({ user }: Props) {
  const [pending, startTransition] = useTransition();
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const id = useId();
  const { update, data } = useSession();
  useEffect(() => {
    (async () => {
      if (clicked) {
        await update();
        startTransition(() => {
          router.refresh();
        });
        setClicked(false);
      }
    })();
  }, [clicked, update]);
  return (
    <main className="max-w-[800px] mx-auto">
      <Alert className="mt-3 text-red-500 border-red-500">
        <AlertCircle className="h-8 w-8  stroke-red-500" />
        <div className="ml-3">
          <AlertTitle className="">Profile Change</AlertTitle>
          <AlertDescription>
            You have {user.leftProfileChanges} profile change left
          </AlertDescription>
        </div>
      </Alert>
      <h2 className="text-3xl font-semibold text-center mt-4 my-5">Profile</h2>
      <div className="flex mx-auto gap-4 sm:flex-row flex-col justify-center ">
        <div className="dark:bg-background">
          <UDFrom
            userName={user.userName as string}
            description={user.description}
          />
        </div>
        <div className="max-w-[200px] mx-auto mt-5 ">
          <h2 className="text-center font-semibold">Upload Profile Photo</h2>
          <div className="dark:border-white dark:border border-dashed dark:bg-background">
            <UploadDropzone<OurFileRouter>
              endpoint="imageUploader"
              onClientUploadComplete={async (res) => {
                setClicked(true);

                toast({ title: "Photo Uploaded" });
              }}
              onUploadError={(error: Error) => {
                toast({ title: error.message, variant: "destructive" });
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
