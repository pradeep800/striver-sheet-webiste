"use client";
import { useEffect, useState } from "react";
import Hamburger from "./svg/hamburger";
import Link from "next/link";
import { useHamburger } from "@/lib/useHamburger";
import { usePathname } from "next/navigation";
import LogIn from "./loginButton";
import UserAvatar from "./userAvatar";
import MobileNav from "./mobileNav";
import MainNav from "./mainNav";
import { SessionUser } from "@/types/next-auth";
interface UserProps {
  user?: SessionUser;
}

export default function NavBar({ user }: UserProps) {
  const pathName = usePathname();
  const [activeNavLink, setActiveNavLink] = useState<string>(pathName);
  const { hamburgerOn, setHamburgerOn } = useHamburger();
  const [oneTimeClickToHamburger, setOneTimeClickToHamburger] = useState(false);
  useEffect(() => {
    setActiveNavLink(
      pathName === "/dashboard" ? "/" : `/${pathName.split("/")[1]}`
    );
  }, [pathName]);
  return (
    <nav
      className="flex  items-center relative z-[2] "
      onClick={() => hamburgerOn && setHamburgerOn(false)}
    >
      <Link
        className="mr-auto relative text-2xl font-bold isolate z-[1] hidden md:block text-red-500 "
        href="/"
      >
        {`Striver's Sheet`}
      </Link>
      <Link
        className="mr-auto relative text-2xl font-bold text-red-500 tracking-wider isolate z-[1]  block md:hidden "
        href="/"
      >
        SS
      </Link>
      <MainNav activeNavLink={activeNavLink} user={user} />
      <MobileNav
        activeNavLink={activeNavLink}
        oneTimeClickToHamburger={oneTimeClickToHamburger}
        user={user}
      />
      {!user ? <LogIn /> : <UserAvatar user={user} />}

      <div className=" md:hidden isolate z-[1]">
        <Hamburger
          oneTimeClickToHamburger={oneTimeClickToHamburger}
          setOneTimeClickToHamburger={setOneTimeClickToHamburger}
        />
      </div>
    </nav>
  );
}