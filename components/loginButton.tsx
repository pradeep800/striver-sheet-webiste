"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function Login() {
  const pathName = usePathname();

  return (
    <Button className="bg-red-500 hover:bg-red-400    mr-6 ml-6 md:mr-0  isolate z-[1] dark:text-white h-[30px]">
      <Link
        className="font-medium "
        href={`/login?callback=${encodeURIComponent(pathName)}`}
      >
        Login
      </Link>
    </Button>
  );
}
