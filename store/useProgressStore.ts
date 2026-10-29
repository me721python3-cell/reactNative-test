import { create } from "zustand";

/**
 * Local UI/app state for user progress (streak, XP, hearts).
 * Per AGENTS.md: Zustand for local state; React Query comes later for server state.
 */
interface ProgressState {
  streak: number;
  hearts: number;
  maxHearts: number;
  totalXp: number;
  loseHeart: () => void;
  refillHearts: () => void;
  addXp: (amount: number) => void;
  advanceStreak: () => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  streak: 0,
  hearts: 5,
  maxHearts: 5,
  totalXp: 0,

  loseHeart: () =>
    set((state) => ({ hearts: Math.max(0, state.hearts - 1) })),

  refillHearts: () => set((state) => ({ hearts: state.maxHearts })),

  addXp: (amount) =>
    set((state) => ({ totalXp: state.totalXp + Math.max(0, amount) })),

  advanceStreak: () => set((state) => ({ streak: state.streak + 1 })),

  resetProgress: () => set({ streak: 0, hearts: 5, totalXp: 0 }),
}));
