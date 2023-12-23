"use client";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function ToastRedirect() {
  const query = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    const error = query.get("error");

    if (error) {
      console.log(error);
      toast({ title: "Error", description: error, variant: "destructive" });
      router.push(path);
    }
  }, [query]);
  return <div></div>;
}
