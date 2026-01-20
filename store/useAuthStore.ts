import { create } from "zustand";

type AuthView = "signin" | "signup";

interface AuthStore {
  isOpen: boolean;
  view: AuthView;
  openAuthModal: (view: AuthView) => void;
  closeAuthModal: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isOpen: false,
  view: "signin",
  openAuthModal: (view) => set({ isOpen: true, view }),
  closeAuthModal: () => set({ isOpen: false }),
}));
