"use server";

import { absoluteUrl } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function signOutAction() {
  const cookiesStore = cookies();
  const csrf = cookiesStore.get("next-auth.csrf-token");
  cookies().set({
    name: "next-auth.csrf-token",
    value: "",
    expires: new Date("2016-10-05"),
    path: "/", // For all paths
  });
  cookies().set({
    name: "next-auth.callback-url",
    value: "",
    expires: new Date("2016-10-05"),
    path: "/", // For all paths
  });
  cookies().set({
    name: "next-auth.session-token",
    value: "",
    expires: new Date("2016-10-05"),
    path: "/", // For all paths
  });

  console.log(csrf);
  await fetch(absoluteUrl("/api/auth/signout"), {
    cache: "no-cache",
    method: "POST",
    body: JSON.stringify({ csrfToken: csrf?.value }),
  });
}
