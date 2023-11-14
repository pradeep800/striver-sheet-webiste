"use client";
import { trpc } from "@/app/_trpc/client";
import Back from "@/components/svg/back";
import {
  useCallback,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import Message from "./message";
import { Send } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { useChatContext } from "@/components/chatContext";
import { Button } from "@/components/ui/button";
import Loading from "@/components/svg/loading";
import { getQuestionInfo } from "@/components/pagesUtils";
type Props = {
  questionNumber: number;
};
export default function MainAiComponent({ questionNumber }: Props) {
  const lastDiv = useRef<HTMLDivElement>(null);
  const [scrollDown, setScrollDown] = useState("not-down");
  const { message, handleInputChange, addMessage, isLoading } =
    useChatContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    data: chatPages,
    isLoading: isChatLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error,
  } = trpc.infiniteMessage.useInfiniteQuery(
    { questionNo: questionNumber },
    {
      getNextPageParam: (lastPage, allPage) => {
        let count = 0;
        for (let i = 0; i < allPage.length; i++) {
          count += allPage[i].length;
        }
        if (lastPage.length === 0) {
          return undefined;
        }
        return count;
      },
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  console.log(chatPages);
  const intersectionObserver = useRef<IntersectionObserver>();

  const lastMessage = useCallback(
    (message: HTMLDivElement) => {
      if (isFetchingNextPage) return;

      if (intersectionObserver.current)
        intersectionObserver.current.disconnect();
      intersectionObserver.current = new IntersectionObserver((messages) => {
        if (messages[0]?.isIntersecting && hasNextPage) {
          void fetchNextPage();
        }
      });
      if (message) intersectionObserver.current.observe(message);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );
  useLayoutEffect(() => {
    if (chatPages?.pages.length === 1) {
      lastDiv.current?.scrollIntoView({ inline: "nearest" });
    }
  }, [chatPages]);

  useEffect(() => {
    if (hasNextPage) {
      const onScroll = (e: Event) => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const maxScrollTop = 200;

        if (scrollTop < maxScrollTop) {
          window.scrollTo(0, maxScrollTop);
        }
      };
      addEventListener("scroll", onScroll);
      return () => {
        removeEventListener("scroll", onScroll);
      };
    }
  }, [hasNextPage]);
  useEffect(() => {
    if (hasNextPage) {
      const onScroll = (e: Event) => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const maxScrollTop = 200;

        if (scrollTop < maxScrollTop) {
          window.scrollTo(0, maxScrollTop);
        }
      };
      addEventListener("scroll", onScroll);
      return () => {
        removeEventListener("scroll", onScroll);
      };
    }
  }, [hasNextPage]);
  useEffect(() => {
    console.log(scrollDown);
    if (scrollDown === "down") {
      const timeout = setTimeout(() => {
        lastDiv.current?.scrollIntoView({
          behavior: "smooth",
        });
        setScrollDown("not-down");
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [scrollDown, setScrollDown]);
  const questionInfo = getQuestionInfo(questionNumber);
  if (isChatLoading) {
    return (
      <div className="max-w-[800px]  mx-auto h-[100%] flex justify-center items-center ">
        <Loading />
      </div>
    );
  }
  console.log("scroll down value inside", scrollDown);
  return (
    <div className="max-w-[800px] mx-auto min-h-[80vh] ">
      <div className="sticky top-0 left-0 right-0  bg-[rgba(255, 255, 255, 0.9)] dark:bg-[rgba(0, 0, 0, 0.77)] ">
        <div className="max-w-[800px]  mx-auto ">
          <div className="cursor-pointer justify-end w-full">
            <div className="w-min pt-2">
              <Back className="p-1 " />
            </div>
          </div>
          <div className="flex justify-between flex-wrap gap-3 mb-2 flex-col items-center  ">
            <h1 className="text-xl font-bold tracking-wide text-red-500 mr-5 text-center">
              {questionInfo.problem}
            </h1>
          </div>
        </div>
      </div>
      <div>
        <div className="flex  flex-col-reverse ">
          {chatPages?.pages?.map((messages, indexOfPage) => {
            return messages.map((message, index) => {
              if (
                Math.min(messages.length, 6) === index + 1 &&
                chatPages.pages.length === indexOfPage + 1
              ) {
                return (
                  <Message
                    message={message}
                    key={message.id}
                    ref={lastMessage}
                  />
                );
              }
              return <Message key={message.id} message={message} />;
            });
          })}
        </div>

        <div ref={lastDiv} className=" ">
          asdfasd
        </div>
        <div
          onSubmit={(e) => e.preventDefault()}
          className="sticky bottom-0 w-[100%]  bg-white pb-3 dark:bg-background"
        >
          <div className="relative">
            <TextareaAutosize
              rows={1}
              maxRows={3}
              autoFocus
              onChange={handleInputChange}
              value={message}
              ref={textareaRef}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();

                  addMessage();

                  textareaRef.current?.focus();
                }
              }}
              placeholder="Enter your question..."
              className="flex w-full rounded-md border border-input bg-background px-3  ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none pr-12 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch "
            />

            <Button
              disabled={isLoading || isChatLoading}
              className="absolute right-2 top-[50%] translate-y-[-50%] bg-red-500 hover:bg-red-400"
              aria-label="send message"
              onClick={() => {
                addMessage();

                textareaRef.current?.focus();
                setScrollDown("down");
              }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
