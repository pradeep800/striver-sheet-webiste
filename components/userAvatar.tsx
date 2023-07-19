"use client";
import { User as user } from "next-auth";

import { BellDot, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { SessionUser } from "@/types/next-auth";
import Link from "next/link";

interface UserProps {
  user: SessionUser;
  stripeCustomerId: string | null;
  showNotification: boolean;
}
export default function UserAvatar({
  user,
  stripeCustomerId,
  showNotification,
}: UserProps) {
  return (
    <div className="flex md:mr-0 mr-3 relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="border-2 cursor-pointer  z-[2] border-red-500 rounded-full overflow-hidden relative">
            {user.image ? (
              <Image
                src={user.image}
                alt="Profile Photo"
                className="w-[30px] h-[30px] object-cover"
                width={30}
                height={30}
              />
            ) : (
              <div className="w-[30px] h-[30px] flex justify-center items-center ">
                <span className="sr-only">{user.name}</span>
                <User className="w-[100%] text-red-500" />
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-4 md:mr-3">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {
              <p className="text-sm text-muted-foreground">
                {"@" + user.userName}
              </p>
            }
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
          <DropdownMenuSeparator />
          <Link href={`/${user.userName}`}>
            <DropdownMenuItem className="">Profile</DropdownMenuItem>
          </Link>
          <Link href={"/sheet/changeProfile"}>
            <DropdownMenuItem className="">Change Profile</DropdownMenuItem>
          </Link>
          <Link href={"/sheet/settings"}>
            <DropdownMenuItem className="">Settings</DropdownMenuItem>
          </Link>
          {!stripeCustomerId ? (
            <Link className="relative" href={"/reminders"}>
              <DropdownMenuItem className="">Reminders</DropdownMenuItem>
              {showNotification ? (
                <BellDot className="w-[10px] h-[10px] text-red-500 absolute top-0 right-0 rounded-full translate-x-[100%]" />
              ) : null}
            </Link>
          ) : null}

          <DropdownMenuItem className="hover:bg-red-500 border-3 border-red-500 p-0 ">
            <div
              className=" hover:bg-red-500 w-full h-full rounded-sm p-1 pl-2"
              onClick={() => {
                signOut();
              }}
            >
              {" "}
              Logout
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {!stripeCustomerId && showNotification && (
        <BellDot className="w-[10px] h-[10px] text-red-500 absolute bottom-0 right-0 rounded-full translate-x-[100%]" />
      )}
    </div>
  );
}
