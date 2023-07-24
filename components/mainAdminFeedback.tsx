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
import { toast } from "./ui/use-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./svg/loading";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useState } from "react";
import { getFeedbacks } from "@/server-action/getFeedbacks";
type Props = {
  feedbacks: {
    id: number;
    userName: string;
    email: string;
    content: string | null;
    type: DbFeedbacks["type"];
    name: string | null;
    role: DbUser["role"];
    created: Date | null;
  }[];
  totalFeedbacks: number;
};
dayjs.extend(relativeTime);
export default function MainAdminFeedback({
  feedbacks,
  totalFeedbacks,
}: Props) {
  const router = useRouter();
  const [loadedFeedbackSize, setLoadedFeedbackSize] = useState(
    () => feedbacks.length
  );
  const [loadedFeedback, setLoadedFeedback] = useState(() => feedbacks);
  async function fetchMore() {
    const nextFeedbacks = await getFeedbacks({ offset: loadedFeedbackSize });
    if ("error" in nextFeedbacks) {
      toast({ title: "Please refresh page", variant: "destructive" });
    } else {
      const allFeedbacks = [...loadedFeedback, ...nextFeedbacks];
      setLoadedFeedbackSize(allFeedbacks.length);
      setLoadedFeedback(allFeedbacks);
    }
  }
  return (
    <InfiniteScroll
      next={fetchMore}
      dataLength={loadedFeedbackSize}
      hasMore={loadedFeedbackSize !== totalFeedbacks}
      loader={
        <div className="mx-auto w-[20px] my-3">
          <Loading />
        </div>
      }
    >
      <div className="max-w-[600px] mx-auto mt-5 flex flex-col gap-3">
        {loadedFeedback.map((feedback) => {
          return (
            <Card key={feedback.id}>
              <CardHeader>
                <CardTitle>{feedback.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <pre>{feedback.content}</pre>

                <div className="mt-3 flex gap-2 flex-wrap">
                  <div
                    className="border-2 rounded-md  text-sm p-1 hover:bg-slate-300 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(feedback.role);
                      toast({ title: "copied successful" });
                    }}
                  >
                    {feedback.role}
                  </div>
                  <div
                    className="border-2 rounded-md text-sm p-1 hover:bg-slate-300 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(feedback.name || "");
                      toast({ title: "copied successful" });
                    }}
                  >
                    {feedback.name}
                  </div>
                  <div
                    className="border-2 rounded-md text-sm p-1 hover:bg-slate-300 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(feedback.userName);
                      toast({ title: "copied successful" });
                    }}
                  >
                    {feedback.userName}
                  </div>
                  <div
                    className="border-2 rounded-md text-sm p-1 hover:bg-slate-300 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(feedback.email);
                      toast({ title: "copied successful" });
                    }}
                  >
                    {feedback.email}
                  </div>
                </div>
                <div className="text-right text-sm mt-1">
                  {dayjs(feedback.created).fromNow()}
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
    </InfiniteScroll>
  );
}
