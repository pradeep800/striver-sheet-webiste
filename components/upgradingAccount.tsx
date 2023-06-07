"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UpgradingAccount() {
  const { update } = useSession();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await update();
      router.refresh();
    })();
  });
  return <div>upgrading account...</div>;
}
