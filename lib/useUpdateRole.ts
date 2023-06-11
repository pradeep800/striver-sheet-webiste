"use client";

import { SessionUser } from "@/types/next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useWindowSize from "./useWindowSize";
import { useConfetti } from "./useConfatti";

export default function useUpdateRole({ user }: { user?: SessionUser }) {
  //update will start working when you are authenticated
  const { update, status } = useSession();
  const setConfettiOn = useConfetti((state) => state.setConfettiOn);
  const router = useRouter();
  const [firstTime, setFirstTime] = useState(false);

  async function UpdateAndRefresh() {
    if (status != "authenticated") {
      return;
    }

    const session = await update();

    if (!user || !session) {
      return;
    }

    if (session.user.role !== user.role) {
      router.refresh();
    }
    if (session.user.role === "PROUSER" && user.role == "USER") {
      setConfettiOn(true);
    }
  }
  useEffect(() => {
    if (status === "authenticated" && !firstTime) {
      UpdateAndRefresh();
      setFirstTime(true);
    }
    const interval = setInterval(UpdateAndRefresh, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [update, status, firstTime]);
  useEffect(() => {
    const visibilityHandler = async () =>
      document.visibilityState === "visible" && UpdateAndRefresh();

    window.addEventListener("visibilitychange", visibilityHandler);
    return () =>
      window.removeEventListener("visibilitychange", visibilityHandler);
  }, [update]);

  return null;
}
