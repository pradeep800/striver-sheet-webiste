"use client";
import { Button } from "./ui/button";
import Github from "./svg/github";
import Loading from "./svg/loading";
import { signIn } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { useSearchParams } from "next/navigation";
type setType = React.Dispatch<
  React.SetStateAction<"gmail" | "github" | "google" | undefined>
>;
export default function LoginWithGithubButton({
  isLoading,
  setIsLoading,
  setType,
  type,
}: {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  type: "gmail" | "github" | "google" | undefined;
  setType: setType;
}) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  return (
    <Button
      onClick={async () => {
        setType("github");
        setIsLoading(true);
        try {
          await signIn("github", {
            callbackUrl: searchParams.get("callback") || "/sheet",
          });
        } catch (err) {
          const error = err as Error;
          console.log(error.message);
          toast({
            title: "Try Another Github Account",
            description:
              "It seems like we are unable authenticate you  with this github account please try with another account",
            variant: "destructive",
          });
          setIsLoading(false);
          setType(undefined);
        }
      }}
      disabled={isLoading}
      className="bg-slate-300 hover:bg-slate-200 sm:text-black text-black-300 "
    >
      {type === "github" && isLoading ? <Loading /> : <Github />}

      <p className="ml-2 text-red-500">Github</p>
    </Button>
  );
}
