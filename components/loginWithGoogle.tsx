"use client";
import { signIn } from "next-auth/react";
import Google from "./svg/google";
import Loading from "./svg/loading";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useSearchParams } from "next/navigation";
type setType = React.Dispatch<
  React.SetStateAction<"gmail" | "github" | "google" | undefined>
>;
type setIsLoading = React.Dispatch<React.SetStateAction<boolean>>;

export default function LogInWithGoogleButton({
  isLoading,
  setIsLoading,
  type,
  setType,
}: {
  isLoading: boolean;
  setIsLoading: setIsLoading;
  type: "gmail" | "github" | "google" | undefined;
  setType: setType;
}) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  return (
    <Button
      disabled={isLoading}
      onClick={async () => {
        setType("google");
        setIsLoading(true);
        try {
          await signIn("google", {
            callbackUrl: searchParams.get("callback") || "/dashboard",
          });
        } catch (err) {
          const error = err as Error;
          console.log(error.message);
          toast({
            title: "Try Another Google Account",
            description:
              "It seems like we are unable to authenticate you with this Google account please try with another account",
            variant: "destructive",
          });
          setIsLoading(false);
          setType(undefined);
        }
      }}
      className="bg-slate-300 hover:bg-slate-200 dark:text-black text-black-300 "
    >
      {type === "google" && isLoading ? <Loading /> : <Google />}
      <p className="ml-2">Google</p>
    </Button>
  );
}
