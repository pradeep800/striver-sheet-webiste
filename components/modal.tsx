"use client";

import React, {
  useCallback,
  useRef,
  useEffect,
  MouseEvent,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import SaveAlert from "./saveAlert";
type Props = {
  children: React.ReactNode;
};
export default function Modal({ children }: Props) {
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onClick = useCallback(
    (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        setOpen(true);
      }
    },
    [overlay, wrapper]
  );

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className=" z-10  bg-black/60  w-[100%]  fixed inset-0 "
      onClick={onClick}
    >
      <div ref={wrapper} className="">
        {children}
        <SaveAlert open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
