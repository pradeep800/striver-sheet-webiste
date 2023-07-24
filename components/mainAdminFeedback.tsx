"use client";
import { DbFeedbacks, DbUser } from "@/lib/db/types";
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
    id: number;
    userName: string;
    email: string;
    content: string | null;
    type: DbFeedbacks["type"];
    name: string | null;
    role: DbUser["role"];
  }[];
};
export default function MainAdminFeedback({ feedbacks }: Props) {
  const router = useRouter();
  return (
    <div className="max-w-[600px] mx-auto mt-5 flex flex-col gap-3">
      {feedbacks.map((feedback) => {
        return (
          <Card key={feedback.id}>
            <CardHeader>
              <CardTitle>
                {feedback.type} | {feedback.role} | {feedback.name} |{" "}
                {feedback.userName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {feedback.content}
              <div className="border-2 rounded-md w-min text-sm p-1 ">
                {feedback.role}
              </div>
            </CardContent>

            <CardFooter>
              <a
                className="w-full text-center hover:bg-slate-300 bg-slate-400 p-1 rounded-md cursor-pointer"
                href={`mailto:${feedback.email}`}
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
