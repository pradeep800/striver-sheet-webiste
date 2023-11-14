import Image from "next/image";
import Si from "@/public/si.png";
import { forwardRef } from "react";
import { useUserInfo } from "@/lib/useUserInfo";
import { User } from "lucide-react";
import type { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc/index";
import MarkDown from "react-markdown";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
type Message = inferRouterOutputs<AppRouter>["infiniteMessage"][number];
const Messages = forwardRef<HTMLDivElement, { message: Message }>(
  ({ message }, ref) => {
    const profilePhoto = useUserInfo((data) => data.userInfo)?.image;

    const messageComponent = (
      <Card className="sm:mx-3 m-0 my-2 ">
        <CardTitle>
          <div className="flex gap-2 items-center p-6 pb-3 ">
            {message.sender === "USER" ? (
              profilePhoto ? (
                <Image
                  className="rounded-full"
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

            <div>{message.sender}</div>
          </div>
        </CardTitle>
        <CardContent>
          <div>
            <MarkDown>{message.message}</MarkDown>
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

export default Messages;
