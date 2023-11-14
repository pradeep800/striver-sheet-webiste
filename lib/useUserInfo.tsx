import { SessionUser } from "@/types/next-auth";
import { userInfo } from "os";
import { create } from "zustand";
interface UserInfoType {
  userInfo: SessionUser | undefined;
}
export const useUserInfo = create<UserInfoType>((set) => ({
  userInfo: undefined,
}));
