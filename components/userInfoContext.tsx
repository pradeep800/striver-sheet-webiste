"use client";
import { ReactNode, createContext, useContext } from "react";
type Context = { userName: string; image: string | undefined | null };
const Context = createContext<Context | undefined>(undefined);
export function useUserInfo() {
  const data = useContext(Context);
  return data;
}

export function UserInfoContext({
  children,
  userName,
  image,
}: {
  children: ReactNode;
  userName: string;
  image: string | undefined | null;
}) {
  return (
    <Context.Provider value={{ userName, image }}>{children}</Context.Provider>
  );
}
