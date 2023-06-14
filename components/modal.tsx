"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React, {
  useCallback,
  useRef,
  useEffect,
  MouseEvent,
  useState,
} from "react";
import { useRouter } from "next/navigation";
type Props = {
  children: React.ReactNode;
};
export default function Modal({ children }: Props) {
  const [isCancel, setIsCancel] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        setOpen(true);
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(true);
      }
    },
    [onDismiss]
  );
  useEffect(() => {
    if (isCancel) {
      onDismiss();
    }
  }, [isCancel]);
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className=" z-10  bg-black/60  w-[100%] h-[100%] fixed top-0"
      onClick={onClick}
    >
      <div ref={wrapper} className="">
        {children}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e.target);
          }}
        >
          <AlertDialog
            open={open}
            onOpenChange={() => {
              setOpen(false);
            }}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Save Page</AlertDialogTitle>
                <AlertDialogDescription>
                  {"Don't forget to save your page."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setIsCancel(true);
                  }}
                >
                  Already Saved
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    setIsCancel(false);
                  }}
                >
                  Yet To Save
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </div>
    </div>
  );
}
