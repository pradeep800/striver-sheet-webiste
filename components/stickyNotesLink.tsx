"use client";
import { absoluteUrl } from "@/lib/utils";
import { StickyNote } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function StickyNotesLink({ id }: { id: number }) {
  const path = usePathname();
  return (
    <Link
      className="hover:text-red-400 text-red-500"
      onClick={(e) => {
        e.stopPropagation();
      }}
      href={`/notes/${id}`}
    >
      <StickyNote className="w-[30px] h-[30px]" />
      <div className="sr-only">notes for this question</div>
    </Link>
  );
}
