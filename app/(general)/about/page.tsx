import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Github, Linkedin, Mail, MenuSquare, Twitter } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-3">
      <Card className="max-w-[600px]">
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            Hi,
            <div className="inline-block   text-2xl  origin-middle-hand animate-wave transform-origin  z-[-1]">
              👋
            </div>
            <p>
              My name is Pradeep Singh, and I am a 20-year-old living in
              Dehradun, Uttarakhand. I possess a strong passion for crafting
              interactive websites. Currently, I am actively seeking internship
              opportunities to further enhance my skills and knowledge in this
              field. If you have any project ideas or if you are in search of
              individuals who are eager to contribute through internships, I
              kindly request you to reach out to me.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-5 text-red-500">
          <SToolTipTrigger description="Resume">
            <a href="https://resume.pradeepbisht.com/" target="_blank">
              <span className="sr-only">Resume Icon</span>
              <MenuSquare className="hover:text-red-400" />
            </a>
          </SToolTipTrigger>
          <SToolTipTrigger description="Mail">
            <a href="mailto:pradeep8b0@gmail.com">
              <span className="sr-only">Mail Icon</span>

              <Mail className="hover:text-red-400" />
            </a>
          </SToolTipTrigger>
          <SToolTipTrigger description="Github">
            <a href="https://github.com/pradeep800" target="_blank">
              <span className="sr-only">Github Icon</span>

              <Github className="hover:text-red-400" />
            </a>
          </SToolTipTrigger>
          <SToolTipTrigger description="Linkedin">
            <a
              href="https://www.linkedin.com/in/pradeep-b-6554a41b0/"
              target="_blank"
            >
              <span className="sr-only">Linkedin Icon</span>
              <Linkedin className="hover:text-red-400" />
            </a>
          </SToolTipTrigger>
        </CardFooter>
      </Card>
    </div>
  );
}
function SToolTipTrigger({
  children,
  description,
}: {
  children: React.ReactNode;
  description: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
