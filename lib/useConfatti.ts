import { create } from "zustand";
type Confetti = {
  confettiOn: boolean;
  setConfettiOn: (value: boolean) => void;
};

export const useConfetti = create<Confetti>((set) => ({
  confettiOn: false,
  setConfettiOn: (on) => set({ confettiOn: on }),
}));
