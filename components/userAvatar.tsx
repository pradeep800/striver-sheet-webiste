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

interface UserProps {
  user: Pick<user, "email" | "image" | "name">;
}
export default function UserAvatar({ user }: UserProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className={" mx-4 md:mr-3  border-red-500 border-2"}>
          {user.image ? (
            <AvatarImage alt="profile photo" src={user.image} />
          ) : (
            <AvatarFallback>
              <span className="sr-only">{user.name}</span>
              <User className="w-4 h-4 text-red-500" />
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-4 md:mr-3">
        <div className="flex flex-col space-y-1 leading-none">
          {user.name && <p className="font-medium">{user.name}</p>}
          {user.email && (
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:bg-red-500"
          onClick={() => signOut()}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
