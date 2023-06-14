"use client";
import { StickyNote } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function StickyNotesLink() {
  const path = usePathname();

  return (
    <Link className="hover:text-red-400 text-red-500" href={`/notes`}>
      <StickyNote className="w-[30px] h-[30px]" />
    </Link>
  );
}
