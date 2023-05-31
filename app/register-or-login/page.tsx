"use client";
import Form from "@/components/form";
import Back from "@/components/svg/back";
import Link from "next/link";
import { useState } from "react";
export default function RegisterPage() {
  const [animation, setAnimation] = useState(false);
  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <Link
        className="absolute left-[30px] top-[20px] font-semibold"
        href={"/"}
      >
        <div
          onMouseEnter={() => {
            setAnimation(true);
          }}
          onMouseLeave={() => {
            setAnimation(false);
          }}
          className="flex items-center gap-1"
        >
          <Back animation={animation} />
          Back
        </div>
      </Link>

      <Form />
    </div>
  );
}
