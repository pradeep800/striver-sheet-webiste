"use client";
import Form from "@/components/form";
import Back from "@/components/svg/back";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
const AuthenticatedRoutes = ["feedback", "dashboard"];
export default function RegisterPage() {
  const search = useSearchParams();

  const shouldUseCallback = useMemo(() => {
    const callbackQuery = decodeURIComponent(search.get("callback") || "");
    if (callbackQuery) {
      const data = decodeURIComponent(callbackQuery);
      const paths = data.split("/");
      for (let i = 0; i < paths.length; i++) {
        if (AuthenticatedRoutes.includes(paths[i])) {
          return false;
        }
      }
    }
    return true;
  }, [search]);

  const callbackQuery = decodeURIComponent(search.get("callback") || "");

  return (
    <div className="w-[100%] sm:h-[100vh] h-[80vh] flex justify-center items-center ">
      <Link
        className="absolute left-[30px] top-[20px] font-semibold"
        href={
          shouldUseCallback ? (callbackQuery === "" ? "/" : callbackQuery) : "/"
        }
      >
        <Back />
      </Link>
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Form />
      </div>
    </div>
  );
}
