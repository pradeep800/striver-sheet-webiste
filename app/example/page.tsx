"use client";
import EmailTemplate from "@/components/emailTemplate";
import Link from "next/link";
import { Action } from "./seraction";

export default function Example() {
  return (
    <div
      onClick={async () => {
        await Action();
      }}
    >
      hello there
    </div>
  );
}
