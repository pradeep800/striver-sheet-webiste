import { create } from "zustand";
type Hamburger = {
  hamburgerOn: boolean;
  setHamburgerOn: (value: boolean) => void;
};

export const useHamburger = create<Hamburger>((set) => ({
  hamburgerOn: false,
  setHamburgerOn: (on) => set({ hamburgerOn: on }),
}));
