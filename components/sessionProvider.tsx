"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};
export const Provider = ({ children }: Props) => {
  return (
    <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={true}>
      {children}
    </SessionProvider>
  );
};
