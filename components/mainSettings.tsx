"use client";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { DbUser } from "@/lib/db/types";
import { useId, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import "@uploadthing/react/styles.css";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
type Props = {
  user: DbUser;
};
export default function MainSetting({ user }: Props) {
  const [userName, setUserName] = useState();
  const router = useRouter();
  const id = useId();
  console.log(user);
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
            onClientUploadComplete={(res) => {
              // Do something with the response
              router.refresh();

              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
        <form className="max-w-[400px] mx-auto flex flex-col gap-3">
          <div>
            <Label htmlFor={`${id}-1`}>UserName</Label>
            <Input id={`${id}-1`} />
          </div>
          <div>
            <Label htmlFor={`${id}-2`}>Description</Label>
            <Textarea id={`${id}-2`} />
          </div>

          <Button>Save Changes</Button>
        </form>
      </div>
    </main>
  );
}
