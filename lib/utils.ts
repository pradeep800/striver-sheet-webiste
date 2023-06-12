import { env } from "@/env.mjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}
export function ConsoleLogUnableToStatusUpdate(
  errorMessage: string,
  subscriptionId: string
) {
  console.log(
    "Unable to Update Status. Error Message :- ",
    errorMessage,
    " subscriptionId:-",
    subscriptionId
  );
}
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let debounceTimer: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};
export const throttling = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let prev = -delay;

  return (...args: Parameters<T>): void => {
    let now = new Date().getTime();

    if (now - prev > delay) {
      prev = now;
      func(...args);
    }
  };
};
