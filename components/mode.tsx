"use client";
import Image from "next/image";
import modeImg from "@/public/mode.png";
import { useTheme } from "next-themes";
import { cn, debounce, throttling } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
export default function Mode({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const onClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return <div className="w-[60px] h-[10px]"></div>;
  }
  return (
    <div
      onClick={onClick}
      className={cn(" w-[60px] overflow-hidden", className)}
    >
      <div
        style={{
          transitionTimingFunction: "steps(10)",
        }}
        className={cn(
          `leading-none w-[660px] h-[100%]  block overflow-hidden transition-transform  duration-100 mobile-select-removed`,
          theme === "dark" ? "translate-x-[-93%] " : "translate-x-0"
        )}
      >
        <Image
          className={"leading-[0] block  "}
          alt="mode image"
          src={modeImg}
          width={660}
        />
      </div>
    </div>
  );
}
