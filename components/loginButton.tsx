import Link from "next/link";
import { Button } from "./ui/button";

export default function LogIn() {
  return (
    <Button className="bg-red-500 hover:bg-red-400    mr-6 ml-6 md:mr-0 isolate z-[1]">
      <Link className="font-medium text-xl" href="register-or-login">
        Login
      </Link>
    </Button>
  );
}
