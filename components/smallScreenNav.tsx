"use client";
import { NAVBARITEMS } from "@/static/navBarItems";
import { Dispatch, SetStateAction, useRef } from "react";
import Link from "next/link";
import { useHamburger } from "@/lib/useHamburger";
import { NavBarItems } from "@/lib/types/navBarTypes";
type SmallScreenProps = {
  activeNavLink: NavBarItems;
  setActiveLink: Dispatch<SetStateAction<NavBarItems>>;
  oneTimeClickToHamburger: boolean;
};
export default function ISmallScreenNav({
  activeNavLink,
  setActiveLink,
  oneTimeClickToHamburger,
}: SmallScreenProps) {
  const nav = useRef<HTMLDivElement>(null);
  const hamburgerOn = useHamburger((state) => state.hamburgerOn);

  if (!hamburgerOn) {
    setTimeout(() => {
      nav.current?.classList.add("hidden");
      nav.current?.classList.remove("flex");
    }, 500);
  } else {
    nav.current?.classList?.add("flex");
    nav.current?.classList?.remove("hidden");
  }

  return (
    <div
      ref={nav}
      className={` md:hidden flex gap-8 flex-col font-medium text-xl justify-center p-3 bg-[rgba(242,242,242,0.3)] backdrop-blur-md fixed inset-0 ${
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
            onClick={() => {
              setActiveLink(navItem.url);
            }}
            key={i}
          >
            <Link
              className={`${
                activeNavLink !== navItem.url
                  ? "relative w-max hover:text-red-500 after:contain-[''] after:scale-x-0 after:origin-bottom-left after:bg-red-500 after:absolute after:transition-transform  after:bottom-0 after:left-0 after:h-[2px] after:w-[100%] hover:after:scale-x-[1] origin-bottom-right after:duration-500"
                  : "underline decoration-[3.5px]  text-red-500"
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
