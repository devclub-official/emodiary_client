import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DiaryEntry } from "./calendar";

interface User {
  id: string;
  email: string;
  name: string;
  provider: "google" | "naver" | "kakao";
}

export interface Theme {
  id: string;
  name: string;
  background: string;
  description: string;
  preview: string;
}

export const THEMES: Theme[] = [
  {
    id: "default",
    name: "기본",
    background: "bg-gradient-to-br from-rose-50 via-sky-50 to-purple-50",
    description: "부드러운 핑크와 퍼플 그라데이션",
    preview: "bg-gradient-to-br from-rose-50 via-sky-50 to-purple-50",
  },
  {
    id: "nature",
    name: "자연",
    background: "bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50",
    description: "신선한 그린과 블루 그라데이션",
    preview: "bg-gradient-to-br from-green-50 to-blue-50",
  },
  {
    id: "warm",
    name: "따뜻한",
    background: "bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50",
    description: "따뜻한 오렌지와 핑크 그라데이션",
    preview: "bg-gradient-to-br from-orange-50 to-pink-50",
  },
  {
    id: "calm",
    name: "차분한",
    background: "bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50",
    description: "조용한 그레이와 블루 그라데이션",
    preview: "bg-gradient-to-br from-slate-50 to-blue-50",
  },
  {
    id: "sunset",
    name: "노을",
    background: "bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50",
    description: "노을빛 퍼플과 오렌지 그라데이션",
    preview: "bg-gradient-to-br from-purple-50 to-orange-50",
  },
  {
    id: "ocean",
    name: "바다",
    background: "bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50",
    description: "시원한 바다빛 블루 그라데이션",
    preview: "bg-gradient-to-br from-cyan-50 to-indigo-50",
  },
];

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

interface ThemeState {
  currentTheme: Theme;
  motivationalQuote: string;
  setTheme: (theme: Theme) => void;
  setMotivationalQuote: (quote: string) => void;
  getThemeById: (id: string) => Theme | undefined;
}

const MOTIVATIONAL_QUOTES = [
  "매일 조금씩, 당신의 마음을 돌보세요 💝",
  "감정도 날씨처럼 변해요, 괜찮아요 🌤️",
  "오늘 하루도 충분히 잘 하셨어요 ✨",
  "작은 기록이 큰 변화를 만들어요 📝",
  "당신의 감정은 소중합니다 🌸",
  "마음의 날씨를 기록하는 용기 💪",
];

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

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      currentTheme: THEMES[0], // 기본 테마
      motivationalQuote: MOTIVATIONAL_QUOTES[0],
      setTheme: (theme) => set({ currentTheme: theme }),
      setMotivationalQuote: (quote) => set({ motivationalQuote: quote }),
      getThemeById: (id) => THEMES.find((theme) => theme.id === id),
    }),
    {
      name: "theme-storage",
    }
  )
);

// 랜덤 명언 생성 함수
export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
  return MOTIVATIONAL_QUOTES[randomIndex];
};
