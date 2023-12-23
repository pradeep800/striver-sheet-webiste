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
  showNotification: boolean;
}

export default function NavBar({
  user,
  stripeCustomerId,
  showNotification,
}: UserProps) {
  const pathName = usePathname();
  useUpdateRole({ user });
  const [activeNavLink, setActiveNavLink] = useState<string>(pathName);
  const { hamburgerOn, setHamburgerOn } = useHamburger();
  const [oneTimeClickToHamburger, setOneTimeClickToHamburger] = useState(false);
  useEffect(() => {
    setActiveNavLink(`/${pathName.split("/")[1]}`);
  }, [pathName]);
  useEffect(() => {
    function popState() {
      setHamburgerOn(false);
    }
    addEventListener("popstate", popState);
    return () => {
      removeEventListener("popstate", popState);
    };
  }, []);
  return (
    <nav
      className="flex  items-center relative z-[2]"
      onClick={() => hamburgerOn && setHamburgerOn(false)}
    >
      <Link
        className="mr-auto relative text-2xl font-bold isolate z-[1] hidden md:block text-red-500 "
        href={user ? "/sheet" : "/"}
      >
        {`Striver's Sheet`}
      </Link>
      <Link
        className="mr-auto relative text-2xl font-bold text-red-500 tracking-wider isolate z-[1]  block md:hidden "
        href={user ? "/sheet" : "/"}
      >
        SS
      </Link>
      <DesktopNav
        activeNavLink={activeNavLink}
        user={user}
        stripeCustomerId={stripeCustomerId}
        showNotification={showNotification}
      />
      <MobileNav
        activeNavLink={activeNavLink}
        stripeCustomerId={stripeCustomerId}
        oneTimeClickToHamburger={oneTimeClickToHamburger}
        user={user}
        showNotification={showNotification}
      />
      {!user ? (
        <Login />
      ) : (
        <UserAvatar
          user={user}
          stripeCustomerId={stripeCustomerId}
          showNotification={showNotification}
        />
      )}
      <div className=" md:hidden isolate z-[1]">
        <Hamburger
          userRole={user?.role}
          oneTimeClickToHamburger={oneTimeClickToHamburger}
          setOneTimeClickToHamburger={setOneTimeClickToHamburger}
          showNotification={showNotification}
          stripeCustomerId={stripeCustomerId}
        />
      </div>
    </nav>
  );
}
