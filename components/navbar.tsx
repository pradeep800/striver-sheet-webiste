"use client";
import { useEffect, useRef, useState } from "react";
import Hamburger from "./svg/hamburger";
import { NAVBARITEMS } from "@/static/navBarItems";
import Link from "next/link";
import { Button } from "./ui/button";
import SmallScreenNav from "./smallScreenNav";
import BigScreenNav from "./bigScreenNav";
import { useHamburger } from "@/lib/useHamburger";
import { NavBarItems } from "@/lib/types/navBarTypes";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathName = usePathname();
  const [activeNavLink, setActiveNavLink] = useState<NavBarItems>(
    pathName as NavBarItems
  );
  const { hamburgerOn, setHamburgerOn } = useHamburger();
  const [oneTimeClickToHamburger, setOneTimeClickToHamburger] = useState(false);
  return (
    <nav
      className="flex  items-center relative z-[2] "
      onClick={() => hamburgerOn && setHamburgerOn(false)}
    >
      <Link
        className="mr-auto relative text-2xl font-bold isolate z-[1] hidden md:block "
        href="/"
        onClick={() => {
          setActiveNavLink("/");
        }}
      >
        {`Striver's Sheet`}
      </Link>
      <Link
        className="mr-auto relative text-2xl font-bold isolate z-[1]  block md:hidden "
        href="/"
        onClick={() => {
          setActiveNavLink("/");
        }}
      >
        SS
      </Link>
      <BigScreenNav
        activeNavLink={activeNavLink}
        setActiveLink={setActiveNavLink}
      />
      <SmallScreenNav
        activeNavLink={activeNavLink}
        setActiveLink={setActiveNavLink}
        oneTimeClickToHamburger={oneTimeClickToHamburger}
      />
      <Button className="bg-red-500 hover:bg-red-400    mr-6 ml-6 md:mr-0 isolate z-[1]">
        <Link className="font-medium text-xl" href="register-or-login">
          Login
        </Link>
      </Button>
      <div className=" md:hidden isolate z-[1]">
        <Hamburger
          oneTimeClickToHamburger={oneTimeClickToHamburger}
          setOneTimeClickToHamburger={setOneTimeClickToHamburger}
        />
      </div>
    </nav>
  );
}
