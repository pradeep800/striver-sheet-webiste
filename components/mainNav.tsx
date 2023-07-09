"use client";
import { NAVBARITEMS } from "@/static/navBarItems";
import Link from "next/link";
import { SessionUser } from "@/types/next-auth";
import Mode from "./mode";
import { useTheme } from "next-themes";
type bigScreenProps = {
  activeNavLink: string;
  user?: SessionUser;
};
export default function MainNav({ activeNavLink, user }: bigScreenProps) {
  const { theme } = useTheme();
  if (user && user.role == "PROUSER") {
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
    <div className="font-medium text-xl hidden md:flex gap-6  mr-auto  items-center">
      {NAVBARITEMS.map((navItem, i) => {
        return (
          <Link
            className={`${
              navItem.url !== activeNavLink
                ? "relative  hover:text-red-500 after:contain-[''] after:scale-x-0 after:origin-bottom-left after:bg-red-500 after:absolute after:transition-transform  after:bottom-0 after:left-0 after:h-[3px] after:w-[100%] hover:after:scale-x-[1] origin-bottom-right after:duration-500"
                : " relative after:content-[''] after:bg-red-500 after:absolute  text-red-500 after:h-[3px] after:w-[100%] after:bottom-0 after:left-0 "
            }`}
            key={i}
            href={navItem.url}
          >
            {navItem.name}
          </Link>
        );
      })}
      <Mode className="mr-auto " />
    </div>
  );
}
