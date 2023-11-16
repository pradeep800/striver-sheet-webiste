"use client";

import AiComponent from "@/components/Ai/aiComponent";
import { useRouter } from "next/navigation";

export function FullPageComponent() {
  const router = useRouter();
  return (
    <AiComponent
      modal={false}
      back={() => {
        router.push("/");
      }}
    />
  );
}
