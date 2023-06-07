import { User } from "next-auth";
type Role = { role: "USER" | "PROUSER" | "ADMIN" };
export type SessionUser = User & Role;
declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "USER" | "PROUSER" | "ADMIN";
  }
}
