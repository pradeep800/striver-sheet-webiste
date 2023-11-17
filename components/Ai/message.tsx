import Image from "next/image";
import Si from "@/public/si.png";
import { forwardRef } from "react";
import { User } from "lucide-react";
import type { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc/index";
import MarkDown from "react-markdown";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useUserInfo } from "@/components/userInfoContext";
import Loading from "../svg/loading";
type Message = inferRouterOutputs<AppRouter>["infiniteMessage"][number];
const Messages = forwardRef<HTMLDivElement, { message: Message }>(
  ({ message }, ref) => {
    const userInfo = useUserInfo();
    const profilePhoto = userInfo?.image;
    const userName = userInfo?.userName;

    const messageComponent = (
      <Card className=" m-0 my-1 mx-2 sm:mx-1">
        <CardTitle>
          <div className="flex gap-2 items-center p-6 pb-3 ">
            {message.sender === "USER" ? (
              profilePhoto ? (
                <Image
                  className="rounded-full w-[30px] h-[30px]"
                  alt="your photo"
                  src={profilePhoto}
                  width={30}
                  height={30}
                />
              ) : (
                <User className="w-[30px] h-[30px]" />
              )
            ) : (
              <Image src={Si} alt="robot" width={30} height={30} />
            )}

            <div>{message.sender === "AI" ? "AI" : userName}</div>
          </div>
        </CardTitle>
        <CardContent>
          <div>
            <MarkDown>{message.message}</MarkDown>
            {message.id === "ai-response" && <Loading />}
          </div>
        </CardContent>
      </Card>
    );
    return ref ? (
      <div ref={ref}>{messageComponent}</div>
    ) : (
      <>{messageComponent}</>
    );
  }
);
Messages.displayName = "Message";
export default Messages;
