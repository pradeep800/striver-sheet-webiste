"use client";

import AuthError from "@/components/authError";
import VerificationError from "@/components/verificationError";
import { useRouter } from "next/navigation";

export default function ErrorPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const isVerificationError = searchParams?.error === "Verification";
  console.log(isVerificationError);
  return (
    <div className="h-[100%]">
      {isVerificationError ? <VerificationError /> : <AuthError />}
    </div>
  );
}
