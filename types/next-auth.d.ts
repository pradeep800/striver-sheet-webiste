import { User } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      role: "USER" | "PROUSER" | "ADMIN";
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: "USER" | "PROUSER" | "ADMIN";
  }
}
