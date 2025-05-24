import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name: string;
  provider: "google" | "naver" | "kakao";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: (user) => set({ user, isAuthenticated: true, isLoading: false }),
  logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
