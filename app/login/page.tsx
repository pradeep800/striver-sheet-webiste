"use client";
import AuthForm from "@/components/authForm";
import Back from "@/components/svg/back";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
//if they are coming from these route in
//login they will not able
//leave this route because it will try to
// transport to authenticated route but they can't
// go to auth route because they are not login

const AuthenticatedRoutes = ["feedback", "sheet", "notes", "admin"];
export default function RegisterPage() {
  const search = useSearchParams();

  const shouldUseCallback = useMemo(() => {
    const callbackQuery = decodeURIComponent(search.get("callback") || "");
    if (callbackQuery !== "") {
      const data = decodeURIComponent(callbackQuery);
      const paths = data.split("/");
      for (let i = 0; i < paths.length; i++) {
        if (AuthenticatedRoutes.includes(paths[i])) {
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  }, [search]);

  const callbackQuery = decodeURIComponent(search.get("callback") || "");
  return (
    <div className="">
      <Link
        className="fixed left-4 top-4 font-semibold cursor-pointer"
        href={shouldUseCallback ? callbackQuery : "/"}
      >
        <Back />
      </Link>
      <div className="fixed  left-[50%] top-[50%]  translate-x-[-50%]  translate-y-[-50%]">
        <AuthForm />
      </div>
    </div>
  );
}
