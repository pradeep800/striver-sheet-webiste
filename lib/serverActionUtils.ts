import { identifiers } from "@/static/identifier";

export function isIdentifier(name: string) {
  for (let i = 0; i < identifiers.length; i++) {
    if (identifiers[i] === name) {
      return true;
    }
  }
  return false;
}
