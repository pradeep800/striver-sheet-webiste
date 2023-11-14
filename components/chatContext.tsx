"use client";
import { ReactNode, createContext, useContext, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/app/_trpc/client";
import { infiniteChatLimit } from "@/static/infiniteScrolling";
import { useToast } from "./ui/use-toast";
type StreamResponse = {
  addMessage: () => void;
  message: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
};

export const ChatContext = createContext<StreamResponse>({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoading: false,
});

interface Props {
  questionNumber: number;
  children: ReactNode;
  lambdaToken: string | null;
}
export function useChatContext() {
  const object = useContext(ChatContext);
  return object;
}

export const ChatContextProvider = ({
  questionNumber,
  children,
  lambdaToken,
}: Props) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const utils = trpc.useContext();

  const { toast } = useToast();

  const backupMessage = useRef("");

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const url =
        "https://no7fvapcfwgcczbaonnnb4yos40djiyy.lambda-url.us-east-2.on.aws/";
      const headers = {
        "Content-Type": "text/plain",
        Authorization: "Bearer " + lambdaToken,
      };
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          questionNumber,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return response.body;
    },
    onMutate: async ({ message }) => {
      backupMessage.current = message;
      setMessage("");

      // step 1
      await utils.infiniteMessage.cancel();

      // step 2
      const previousMessages = utils.infiniteMessage.getInfiniteData();

      // step 3
      utils.infiniteMessage.setInfiniteData(
        { questionNo: questionNumber },
        (old) => {
          if (!old) {
            return {
              pages: [],
              pageParams: [],
            };
          }

          let newPages = [...old.pages];

          let latestPage = newPages[0]!;
          console.log("latest page", latestPage);
          console.log("old", old);
          latestPage = [
            {
              createdAt: Date.now(),
              id: crypto.randomUUID(),
              message: message,
              sender: "USER",
            },
            ...latestPage,
          ];

          newPages[0] = latestPage;

          return {
            ...old,
            pages: newPages,
          };
        }
      );

      setIsLoading(true);

      return {
        previousMessages: previousMessages?.pages.flat() ?? [],
      };
    },
    onSuccess: async (stream) => {
      setIsLoading(true);

      if (!stream) {
        return toast({
          title: "Server Error Please Try Again",
          variant: "destructive",
        });
      }

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      // accumulated response
      let accResponse = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        console.log(chunkValue);
        accResponse += chunkValue;

        // append chunk to the actual message
        utils.infiniteMessage.setInfiniteData(
          { questionNo: questionNumber },
          (old) => {
            console.log(old);
            if (!old) return { pages: [], pageParams: [] };

            let isAiResponseCreated = old.pages.some((page) =>
              page.some((message) => message.id === "ai-response")
            );

            let updatedPages = old.pages.map((page) => {
              if (page === old.pages[0]) {
                let updatedMessages;

                if (!isAiResponseCreated) {
                  updatedMessages = [
                    {
                      createdAt: Date.now(),
                      id: "ai-response",
                      message: accResponse,
                      sender: "AI" as "AI" | "USER",
                    },
                    ...page,
                  ];
                } else {
                  updatedMessages = page.map((message) => {
                    if (message.id === "ai-response") {
                      return {
                        ...message,
                        message: accResponse,
                      };
                    }
                    return message;
                  });
                }
                return updatedMessages;
              }

              return page;
            });
            return { ...old, pages: updatedPages };
          }
        );
      }
    },

    onError: (_, __, context) => {
      setMessage(backupMessage.current);
      toast({ title: "Server Error", variant: "destructive" });
      utils.infiniteMessage.setData(
        { questionNo: questionNumber },
        context?.previousMessages ?? []
      );
    },
    onSettled: async () => {
      setIsLoading(false);

      await utils.infiniteMessage.invalidate({
        questionNo: questionNumber,
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const addMessage = () => {
    if (message.trim() === "") {
      setMessage("");
      return;
    }
    sendMessage({ message });
  };

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
