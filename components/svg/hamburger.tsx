"use client";
import { useHamburger } from "@/lib/useHamburger";
import { BellDot } from "lucide-react";
import { Session } from "next-auth";
type setOneTimeClickToHamburger = React.Dispatch<React.SetStateAction<boolean>>;
type HamburgerTypeProps = {
  oneTimeClickToHamburger: boolean;
  setOneTimeClickToHamburger: setOneTimeClickToHamburger;
  showNotification: boolean;
  stripeCustomerId: string | null;
  userRole: Session["user"]["role"] | undefined;
};
export default function Hamburger({
  userRole,
  oneTimeClickToHamburger,
  setOneTimeClickToHamburger,
  showNotification,
  stripeCustomerId,
}: HamburgerTypeProps) {
  const { hamburgerOn: on, setHamburgerOn: setOn } = useHamburger();
  if (on) {
    if (typeof document != undefined)
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
  } else {
    if (typeof document !== "undefined")
      document.getElementsByTagName("body")[0].style.overflow = "visible";
  }
  return (
    <div>
      <span className="sr-only ">Hamburger Icon</span>
      <svg
        className="fill-red-500 hover:fill-red-400"
        onClick={() => {
          setOn(!on);
          setOneTimeClickToHamburger(true);
        }}
        width="30"
        height="30"
        viewBox="0 0 57 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={`${
            on ? "animate-path-first " : "animate-reverse-path-first "
          } will-change-transform  origin-hamburger-middle relative`}
          id="first"
          d="M52.553 0.0800018H4.44702C2.32237 0.0800018 0.6 1.80237 0.6 3.92702C0.6 6.05167 2.32236 7.77404 4.44701 7.77404H52.553C54.6776 7.77404 56.4 6.05167 56.4 3.92702C56.4 1.80237 54.6776 0.0800018 52.553 0.0800018Z"
        />
        <path
          className={` ${on ? "animate-despair " : ""} will-change-transform `}
          id="second"
          d="M52.553 15.9059H4.44702C2.32237 15.9059 0.6 17.6283 0.6 19.7529C0.6 21.8776 2.32237 23.6 4.44702 23.6H52.553C54.6776 23.6 56.4 21.8776 56.4 19.7529C56.4 17.6283 54.6776 15.9059 52.553 15.9059Z"
        />
        <path
          className={` ${
            on ? "animate-path-third" : "animate-reverse-path-third"
          } will-change-transform origin-hamburger-middle `}
          id="third"
          d="M52.553 31.44H4.44702C2.32237 31.44 0.6 33.1624 0.6 35.287C0.6 37.4117 2.32237 39.134 4.44702 39.134H52.553C54.6776 39.134 56.4 37.4117 56.4 35.287C56.4 33.1624 54.6776 31.44 52.553 31.44Z"
        />
      </svg>

      {(stripeCustomerId || (userRole && userRole === "ADMIN")) &&
      showNotification ? (
        <BellDot className="w-[10px] h-[10px] text-red-500 absolute top-0 right-0 rounded-full translate-x-[100%]" />
      ) : null}
    </div>
  );
}
