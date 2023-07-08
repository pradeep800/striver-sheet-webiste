"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { useToast } from "./ui/use-toast";

import LogInWithGithubButton from "./loginWithGithub";
import LogInWithGoogleButton from "./loginWithGoogle";

import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "./svg/loading";

export default function Form() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<"gmail" | "github" | "google" | undefined>();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  function reset() {
    setIsLoading(false);
    setType(undefined);
  }
  async function SignIn() {
    setType("gmail");
    setIsLoading(true);
    const emailSchema = z.string().email("Invalid Email");
    const safeParseEmail = emailSchema.safeParse(email);
    if (!safeParseEmail.success) {
      toast({
        title: "Invalid Email",
        description: "Check your email it's not correct",
      });
      reset();
      return;
    }

    try {
      await signIn("email", {
        redirect: false,
        email: email,
        callbackUrl: searchParams.get("callback") || "/sheet",
      });
      router.push("/register-or-login/verify-request");
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      toast({
        title: "Unable to Send Mail",
        description: "Check your gmail if it is correct or not",
        variant: "destructive",
      });
      reset();
    }
  }

  return (
    <div className="w-[100vw] sm:w-[100%]">
      <div className="flex sm:w-[400px] w-[95%] flex-col m-2 gap-2">
        <Input
          className="w-[100%] dark:border-gray-500"
          disabled={isLoading}
          placeholder="example@gmail.com"
          onChange={onChange}
        />

        <Button
          className="bg-red-500 hover:bg-red-400 w-[100%]"
          disabled={isLoading}
          onClick={SignIn}
        >
          {type === "gmail" && isLoading ? <Loading /> : null}
          <p className="pl-2">Send Verification Mail</p>
        </Button>
        <LogInWithGoogleButton
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          type={type}
          setType={setType}
        />
        <LogInWithGithubButton
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          type={type}
          setType={setType}
        />
      </div>
    </div>
  );
}
