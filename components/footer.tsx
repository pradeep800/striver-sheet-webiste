"use client";
import { MenuSquare } from "lucide-react";
import { Socials } from "./socials";

export default function Footer() {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <hr />

      <div className="font-light text-center">
        Content in this website is from{" "}
        <a
          className="underline hover:text-red-400 text-red-500"
          href="https://takeuforward.org/"
          target="_blank"
        >
          takeuforward website
        </a>{" "}
        and This website does not claim any ownership or copyright.
      </div>
      <div className="text-red-500 flex justify-center gap-5">
        <Socials />
      </div>
    </div>
  );
}
