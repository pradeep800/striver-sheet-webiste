import { create } from "zustand";
type Confetti = {
  query: string;
  setQuery: (value: string) => void;
};

export const useConfetti = create<Confetti>((set) => ({
  query: "",
  setQuery: (updatedQuery) => set({ query: updatedQuery }),
}));
