import { MenuSquare } from "lucide-react";

export default function Footer() {
  return (
    <div>
      <hr />

      <a
        className="flex w-[100%] justify-center gap-2 hover:text-red-500"
        href="https://resume.pradeepbisht.com"
      >
        <span>Download My Resume</span> <MenuSquare />
      </a>

      <div className="font-light text-center">
        Content in this website is from{" "}
        <a
          className="underline hover:text-red-500"
          href="https://takeuforward.org/"
          target="_blank"
        >
          takeuforward website
        </a>{" "}
        and This website does not claim any ownership or copyright.
      </div>
    </div>
  );
}
