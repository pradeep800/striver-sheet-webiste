"use client";
import { useEffect, useState } from "react";
import Hamburger from "./svg/hamburger";
import Link from "next/link";
import { useHamburger } from "@/lib/useHamburger";
import { usePathname } from "next/navigation";
import Login from "./loginButton";
import UserAvatar from "./userAvatar";
import MobileNav from "./mobileNav";
import DesktopNav from "./desktopNav";
import { SessionUser } from "@/types/next-auth";
import useUpdateRole from "@/lib/useUpdateRole";
interface UserProps {
  user?: SessionUser;
  stripeCustomerId: string | null;
}

export default function NavBar({ user, stripeCustomerId }: UserProps) {
  const pathName = usePathname();
  useUpdateRole({ user });
  const [activeNavLink, setActiveNavLink] = useState<string>(pathName);
  const { hamburgerOn, setHamburgerOn } = useHamburger();
  const [oneTimeClickToHamburger, setOneTimeClickToHamburger] = useState(false);
  useEffect(() => {
    setActiveNavLink(`/${pathName.split("/")[1]}`);
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
      <DesktopNav
        activeNavLink={activeNavLink}
        user={user}
        stripeCustomerId={stripeCustomerId}
      />
      <MobileNav
        activeNavLink={activeNavLink}
        stripeCustomerId={stripeCustomerId}
        oneTimeClickToHamburger={oneTimeClickToHamburger}
        user={user}
      />
      {!user ? <Login /> : <UserAvatar user={user} />}
      <div className=" md:hidden isolate z-[1]">
        <Hamburger
          oneTimeClickToHamburger={oneTimeClickToHamburger}
          setOneTimeClickToHamburger={setOneTimeClickToHamburger}
        />
      </div>
    </nav>
  );
}
