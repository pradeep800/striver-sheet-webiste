"use client";
import { UploadButton, UploadDropzone, Uploader } from "@uploadthing/react";
import { DbUser } from "@/lib/db/types";
import { FormEvent, useEffect, useId, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import "@uploadthing/react/styles.css";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, Copy, CopyCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "./ui/use-toast";
import UDFrom from "./formForChangingDescriptionAndName";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
type Props = {
  user: DbUser;
};
export default function MainProfileChange({ user }: Props) {
  const [profileUrl, setProfileUrl] = useState(
    `https://striversheet.pradeepbisht.com/${user.userName}`
  );
  const [copyUrl, setCopyUrl] = useState(false);
  const [pending, startTransition] = useTransition();
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const id = useId();
  const { update, data } = useSession();
  useEffect(() => {
    setClicked(false);
  }, [profileUrl]);
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
        <AlertCircle className="h-8 w-8 stroke-red-500 " />

        <AlertTitle className="ml-4">Profile Change</AlertTitle>
        <AlertDescription className="ml-4">
          You have {user.leftProfileChanges} profile change left
        </AlertDescription>
      </Alert>
      <div className="my-3">
        <Card className="">
          <CardHeader>
            <CardTitle className="mx-auto">Share Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className=" flex gap-2 justify-center   ">
              <Link
                href={profileUrl}
                target="_blank"
                className="hover:underline text-red-500 hover:text-red-400"
              >
                <div className="break-all">{profileUrl}</div>
              </Link>
              <div
                className="w-[30px] h-[30px] xs:h-[20px] text-red-500 hover:text-red-400"
                onClick={() => {
                  navigator.clipboard.writeText(profileUrl);
                  setCopyUrl(true);
                  toast({ title: "URL is copied" });
                }}
              >
                {copyUrl ? (
                  <CopyCheck className="w-[100%] h-[100%]" />
                ) : (
                  <Copy className="w-[100%] h-[100%]" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-3xl font-semibold text-center mt-4 my-5">Profile</h2>
      <div className="flex mx-auto gap-4 sm:flex-row flex-col justify-center ">
        <div className="dark:bg-background">
          <UDFrom
            setProfileUrl={setProfileUrl}
            setCopyUrl={setCopyUrl}
            userName={user.userName as string}
            description={user.description}
          />
        </div>
        <div className="max-w-[200px] mx-auto my-8 ">
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
