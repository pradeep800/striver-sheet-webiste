"use client";
import { User as user } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Mode from "./mode";
import { SessionUser } from "@/types/next-auth";
import Link from "next/link";
import { absoluteUrl } from "@/lib/utils";

interface UserProps {
  user: SessionUser;
}
export default function UserAvatar({ user }: UserProps) {
  return (
    <div className="flex md:mr-0 mr-3">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="border-2 cursor-pointer relative z-[2] border-red-500 rounded-full overflow-hidden">
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
          <Link href={"/sheet/settings"}>
            <DropdownMenuItem className="hover:bg-red-500 border-3 border-red-500 ">
              settings
            </DropdownMenuItem>
          </Link>
          <Link href={"/sheet/changeProfile"}>
            <DropdownMenuItem className="hover:bg-red-500 border-3 border-red-500 ">
              change profile
            </DropdownMenuItem>
          </Link>

          <Link href={`/${user.userName}`}>
            <DropdownMenuItem className="hover:bg-red-500 border-3 border-red-500  ">
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className="hover:bg-red-500 border-3 border-red-500 p-0 "
            onClick={() => {
              signOut();
            }}
          >
            <div className=" hover:bg-red-500 w-full h-full rounded-sm p-1 pl-2">
              {" "}
              Logout
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
