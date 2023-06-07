"use client";
import { NAVBARITEMS } from "@/static/navBarItems";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useHamburger } from "@/lib/useHamburger";
import { SessionUser } from "@/types/next-auth";
type SmallScreenProps = {
  activeNavLink: string;
  oneTimeClickToHamburger: boolean;
  user?: SessionUser;
};
export default function MobileNav({
  activeNavLink,
  oneTimeClickToHamburger,
  user,
}: SmallScreenProps) {
  const nav = useRef<HTMLDivElement>(null);
  const hamburgerOn = useHamburger((state) => state.hamburgerOn);
  useEffect(() => {
    let timer: any;
    if (!hamburgerOn) {
      //remove class after 1s so they can see sliding off animation
      timer = setTimeout(() => {
        nav.current?.classList.add("hidden");
        nav.current?.classList.remove("flex");
      }, 700);
    } else {
      nav.current?.classList?.add("flex");
      nav.current?.classList?.remove("hidden");
    }
    return () => {
      clearTimeout(timer);
    };
  });

  if (user && user.role == "PROUSER") {
    NAVBARITEMS[1].url = "/billing";
    NAVBARITEMS[1].name = "Billing";
  }
  return (
    <div
      ref={nav}
      className={`cursor-pointer  md:hidden flex gap-8 flex-col font-medium text-xl justify-center p-3 bg-[rgba(242,242,242,0.3)] backdrop-blur-md fixed inset-0 ${
        !oneTimeClickToHamburger && "hidden"
      } `}
    >
      {NAVBARITEMS.map((navItem, i) => {
        return (
          <div
            className={`${
              hamburgerOn && "translate-x-[-100%]"
            } will-change-transform ${
              hamburgerOn ? putIntoView[i] : putOutOfView[i]
            } `}
            key={i}
          >
            <Link
              className={`${
                activeNavLink !== navItem.url
                  ? "relative hover:text-red-500 after:contain-[''] after:scale-x-0 after:origin-bottom-left after:bg-red-500 after:absolute after:transition-transform  after:bottom-0 after:left-0 after:h-[2px] after:w-[100%] hover:after:scale-x-[1] origin-bottom-right after:duration-500 "
                  : " relative after:content-[''] after:bg-red-500 after:absolute decoration-[3.5px] text-red-500 after:h-[2px] after:w-[100%] after:bottom-0 after:left-0 "
              }`}
              href={navItem.url}
            >
              {navItem.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
//dynamic classes not works tailwind css
/*
  `animate-${i}`
  we can't do that 
*/
const putIntoView = [
  "animate-putIntoView1",
  "animate-putIntoView2",
  "animate-putIntoView3",
  "animate-putIntoView4",
];
const putOutOfView = [
  "animate-putOutOfView1",
  "animate-putOutOfView2",
  "animate-putOutOfView3",
  "animate-putOutOfView4",
];
