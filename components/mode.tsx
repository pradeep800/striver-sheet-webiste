"use client";
import Image from "next/image";
import modeImg from "@/public/mode.png";
import { useTheme } from "next-themes";
import { debounce, throttling } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
export default function Mode({ className }: { className?: string }) {
  const [localStorageTheme, setLocalStorageTheme] = useState(() =>
    localStorage.getItem("localStorageTheme")
  );

  const { setTheme, theme } = useTheme();
  const Click = useCallback(
    debounce(() => {
      setTheme(localStorageTheme === "light" ? "dark" : "light");
    }, 400),
    [localStorageTheme, setTheme]
  );

  useEffect(() => {
    setLocalStorageTheme(theme as string);
  }, [theme]);

  return (
    <div
      onClick={Click}
      className={clsx(" w-[60px] overflow-hidden", className)}
    >
      <div
        style={{
          transitionTimingFunction: "steps(10)",
        }}
        className={`leading-none w-[660px] h-[100%]  block overflow-hidden transition-transform ${
          localStorageTheme === "dark" ? "translate-x-[-93%] " : "translate-x-0"
        } duration-100`}
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
