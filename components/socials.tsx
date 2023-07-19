import { Mail, MenuSquare, Twitter, Github } from "lucide-react";
import { NToolTip } from "./tooltip";
export function Socials() {
  return (
    <>
      <NToolTip description="Resume">
        <a href="https://resume.pradeepbisht.com/" target="_blank">
          <span className="sr-only">Resume Icon</span>
          <MenuSquare className="hover:text-red-400" />
        </a>
      </NToolTip>
      <NToolTip description="Mail">
        <a href="mailto:pradeep8b0@gmail.com">
          <span className="sr-only">Mail Icon</span>

          <Mail className="hover:text-red-400" />
        </a>
      </NToolTip>
      <NToolTip description="Github">
        <a href="https://github.com/pradeep800" target="_blank">
          <span className="sr-only">Github Icon</span>

          <Github className="hover:text-red-400" />
        </a>
      </NToolTip>
      <NToolTip description="Linkedin">
        <a href="https://twitter.com/pradeep8b0" target="_blank">
          <span className="sr-only">Linkedin Icon</span>
          <Twitter className="hover:text-red-400" />
        </a>
      </NToolTip>
    </>
  );
}
