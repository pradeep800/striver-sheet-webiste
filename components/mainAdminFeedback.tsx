"use client";
import { DbFeedbacks } from "@/lib/db/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
type Props = {
  feedbacks: {
    userName: string;
    email: string;
    content: string;
    type: DbFeedbacks["type"];
    name: string;
    role: string;
  };
};
export default function MainAdminFeedback({
  feedbacks,
}: {
  feedbacks: DbFeedbacks[];
}) {
  const router = useRouter();
  return (
    <div className="max-w-[600px] mx-auto mt-5 flex flex-col gap-3">
      {feedbacks.map((feedback) => {
        return (
          <Card>
            <CardHeader>
              <CardTitle>{feedback.type}</CardTitle>
            </CardHeader>
            <CardContent>
              {feedback.content}
              <div className="border-2 rounded-md w-min text-sm p-1 ">
                {feedback.user_role}
              </div>
            </CardContent>

            <CardFooter>
              <a
                className="w-full text-center hover:bg-slate-300 bg-slate-400 p-1 rounded-md cursor-pointer"
                href={`mailto:${feedback.mail}`}
                target={"_blank"}
              >
                Send Mail
              </a>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
