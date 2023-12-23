"use client";
import { ReactNode, createContext, useContext, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/app/_trpc/client";
import { infiniteChatLimit } from "@/static/infiniteScrolling";
import { useToast } from "./ui/use-toast";
import { useParams } from "next/navigation";
import { useIsStreamingContext } from "./isChatStreamingContext";
type StreamResponse = {
  addMessage: () => void;
  message: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  scrollDown: "not-down" | "down";
  setScrollDownWrapper: (data: "not-down" | "down") => void;
};

export const ChatContext = createContext<StreamResponse>({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  scrollDown: "not-down",
  setScrollDownWrapper: (data: "not-down" | "down") => {},
});

interface Props {
  children: ReactNode;
  lambdaToken: string | null;
}
export function useChatContext() {
  const object = useContext(ChatContext);
  return object;
}

export const ChatContextProvider = ({ children, lambdaToken }: Props) => {
  const [message, setMessage] = useState<string>("");
  const { isLoading, setIsLoading } = useIsStreamingContext();
  const utils = trpc.useContext();
  const { questionNo } = useParams();
  const [scrollDown, setScrollDown] = useState<"not-down" | "down">("not-down");
  const questionNumber = parseInt(questionNo as string);
  const { toast } = useToast();

  const backupMessage = useRef("");

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const url =
        "https://aocbhhh2i7dhgpv6srjlmax6sy0lkawy.lambda-url.ap-south-1.on.aws/";
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

          latestPage = [
            {
              createdAt: Date.now(),
              id: "ai-response",
              message: "",
              sender: "AI" as "AI" | "USER",
            },
            {
              createdAt: Date.now(),
              id: crypto.randomUUID(),
              message: message,
              sender: "USER",
            },
            ...latestPage,
          ];

          newPages[0] = latestPage;
          setTimeout(() => {
            setScrollDown("down");
          }, 500);
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
        accResponse += chunkValue;

        // append chunk to the actual message
        utils.infiniteMessage.setInfiniteData(
          { questionNo: questionNumber },
          (old) => {
            if (!old) return { pages: [], pageParams: [] };

            let updatedPages = old.pages.map((page) => {
              if (page === old.pages[0]) {
                let updatedMessages;

                updatedMessages = page.map((message) => {
                  if (message.id === "ai-response") {
                    return {
                      ...message,
                      message: accResponse,
                    };
                  }
                  return message;
                });

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
      setIsLoading(false);
    },
    onSettled: async () => {
      await utils.infiniteMessage.invalidate({
        questionNo: questionNumber,
      });
      setIsLoading(false);
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
  function setScrollDownWrapper(data: "not-down" | "down") {
    setScrollDown(data);
  }

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,

        scrollDown,
        setScrollDownWrapper,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
