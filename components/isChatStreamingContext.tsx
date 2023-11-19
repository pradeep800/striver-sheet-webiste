"use client";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
interface Context {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
const Context = createContext<Context>({
  isLoading: true,
  setIsLoading: () => {},
});
export function useIsStreamingContext() {
  const data = useContext(Context);
  return data;
}
export function IsChatStreamingContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Context.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </Context.Provider>
  );
}
