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
  const [userName, setUserName] = useState();
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
      <Alert className="mt-3">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="p">Profile Change</AlertTitle>
        <AlertDescription>
          You have {user.leftProfileChanges} profile change left
        </AlertDescription>
      </Alert>
      <div>
        <h2 className="text-2xl font-semibold text-center mt-4">Profile</h2>
        <div className="max-w-[200px] mx-auto mt-5">
          <h2 className="text-center">Upload Profile Photo</h2>
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
        <UDFrom
          userName={user.userName as string}
          description={user.description}
        />
      </div>
    </main>
  );
}
