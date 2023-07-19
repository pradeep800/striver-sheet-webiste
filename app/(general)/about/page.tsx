import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Socials } from "@/components/socials";
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
          <Socials />
        </CardFooter>
      </Card>
    </div>
  );
}
