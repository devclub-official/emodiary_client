import { create } from "zustand";
import type { DiaryEntry } from "./calendar";

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

interface DiaryState {
  entries: DiaryEntry[];
  isLoading: boolean;
  addEntry: (entry: DiaryEntry) => void;
  updateEntry: (id: string, entry: Partial<DiaryEntry>) => void;
  deleteEntry: (id: string) => void;
  getEntryByDate: (date: string) => DiaryEntry | undefined;
  setLoading: (loading: boolean) => void;
  setEntries: (entries: DiaryEntry[]) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: (user) => set({ user, isAuthenticated: true, isLoading: false }),
  logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

export const useDiaryStore = create<DiaryState>((set, get) => ({
  entries: [],
  isLoading: false,
  addEntry: (entry) => set((state) => ({ entries: [...state.entries, entry] })),
  updateEntry: (id, updatedEntry) =>
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      ),
    })),
  deleteEntry: (id) =>
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id),
    })),
  getEntryByDate: (date) => {
    const { entries } = get();
    return entries.find((entry) => entry.date === date);
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setEntries: (entries) => set({ entries }),
}));
