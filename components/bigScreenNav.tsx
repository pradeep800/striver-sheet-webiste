import { NavBarItems } from "@/lib/types/navBarTypes";
import { NAVBARITEMS } from "@/static/navBarItems";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
type bigScreenProps = {
  activeNavLink: NavBarItems;
  setActiveLink: Dispatch<SetStateAction<NavBarItems>>;
};
export default function BigScreenNav({
  activeNavLink,
  setActiveLink,
}: bigScreenProps) {
  return (
    <div className="font-medium text-xl hidden md:flex gap-6  ">
      {NAVBARITEMS.map((navItem, i) => {
        return (
          <Link
            className={`${
              navItem.url !== activeNavLink
                ? "relative hover:text-red-500 after:contain-[''] after:scale-x-0 after:origin-bottom-left after:bg-red-500 after:absolute after:transition-transform  after:bottom-0 after:left-0 after:h-[2px] after:w-[100%] hover:after:scale-x-[1] origin-bottom-right after:duration-500"
                : "underline decoration-[3.5px] text-red-500"
            }`}
            onClick={() => {
              setActiveLink(navItem.url);
            }}
            key={i}
            href={navItem.url}
          >
            {navItem.name}
          </Link>
        );
      })}
    </div>
  );
}
