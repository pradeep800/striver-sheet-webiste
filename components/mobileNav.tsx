"use client";
import { NAVBARITEMS } from "@/static/navBarItems";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useHamburger } from "@/lib/useHamburger";
import { SessionUser } from "@/types/next-auth";
import Mode from "./mode";
import { BellDot } from "lucide-react";
type SmallScreenProps = {
  activeNavLink: string;
  oneTimeClickToHamburger: boolean;
  user?: SessionUser;
  stripeCustomerId: null | string;
  showNotification: boolean;
};
export default function MobileNav({
  activeNavLink,
  oneTimeClickToHamburger,
  user,
  stripeCustomerId,
  showNotification,
}: SmallScreenProps) {
  const nav = useRef<HTMLDivElement>(null);
  const [themeChanged, setThemeChanged] = useState(false);
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
  //one condition for if user become user and one for if user became pro user
  if (user && (stripeCustomerId || user.role === "ADMIN")) {
    NAVBARITEMS[1].url = "/reminders";
    NAVBARITEMS[1].name = "Reminders";
  } else {
    NAVBARITEMS[1].url = "/pricing";
    NAVBARITEMS[1].name = "Pricing";
  }
  if (user) {
    NAVBARITEMS[0].name = "Sheet";
    NAVBARITEMS[0].url = "/sheet";
  } else {
    //when we logout it will change it home again
    NAVBARITEMS[0].name = "Home";
    NAVBARITEMS[0].url = "/";
  }

  return (
    <div
      ref={nav}
      className={`cursor-pointer mobile-select-removed  md:hidden flex gap-8 flex-col font-medium text-xl justify-center p-3 bg-[rgba(242,242,242,0.3)] backdrop-blur-md fixed inset-0 ${
        !oneTimeClickToHamburger && "hidden"
      } `}
    >
      {NAVBARITEMS.map((navItem, i) => {
        if (
          navItem.name === "Reminders" &&
          showNotification &&
          (stripeCustomerId || (user && user.role === "ADMIN"))
        ) {
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
                  navItem.url !== activeNavLink
                    ? "relative hover:text-red-500 after:contain-[''] after:scale-x-0 after:origin-bottom-left after:bg-red-500 after:absolute after:transition-transform  after:bottom-0 after:left-0 after:h-[3px] after:w-[100%] hover:after:scale-x-[1] origin-bottom-right after:duration-500"
                    : " relative after:content-[''] after:bg-red-500 after:absolute  text-red-500 after:h-[3px] after:w-[100%] after:bottom-0 after:left-0 "
                }`}
                href={navItem.url}
              >
                {navItem.name}

                <BellDot className="w-[10px] h-[10px] text-red-500 absolute top-0 right-0 rounded-full translate-x-[100%]" />
              </Link>
            </div>
          );
        }
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
              className={`py-1 ${
                navItem.url !== activeNavLink
                  ? "relative hover:text-red-500 after:contain-[''] after:scale-x-0 after:origin-bottom-left after:bg-red-500 after:absolute after:transition-transform  after:bottom-0 after:left-0 after:h-[3px] after:w-[100%] hover:after:scale-x-[1] origin-bottom-right after:duration-500"
                  : " relative after:content-[''] after:bg-red-500 after:absolute  text-red-500 after:h-[3px] after:w-[100%] after:bottom-0 after:left-0 "
              }`}
              href={navItem.url}
            >
              {navItem.name}
            </Link>
          </div>
        );
      })}

      <Mode
        className={`fixed left-[50%] translate-x-[-50%]  ${
          hamburgerOn ? "bottom-[-20px]" : "bottom-[15px]"
        } ${
          hamburgerOn || themeChanged
            ? "animate-top-to-down"
            : "animate-down-to-out-of-view"
        }`}
      />
    </div>
  );
}
//#https://tailwindcss.com/docs/content-configuration#class-detection-in-depth
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
