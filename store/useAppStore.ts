import { create } from "zustand";

import { LessonStatus } from "@/data/mockUnits";
import { ActiveCourse, mockUserProgress } from "@/data/mockUserProgress";

export interface AppState {
  // Gamification stats
  streak: number;
  gems: number;
  hearts: number;
  maxHearts: number;
  activeCourse: ActiveCourse;

  // Lesson progression
  completedLessonIds: string[];
  activeLessonId: string;

  // Actions
  decrementHeart: () => void;
  refillHearts: () => void;
  addGems: (amount: number) => void;
  incrementStreak: () => void;
  setActiveCourse: (course: ActiveCourse) => void;
  completeLesson: (lessonId: string, nextLessonId?: string) => void;
  getLessonStatus: (lessonId: string) => LessonStatus;
  resetProgress: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  streak: mockUserProgress.streak,
  gems: mockUserProgress.gems,
  hearts: mockUserProgress.hearts,
  maxHearts: mockUserProgress.maxHearts,
  activeCourse: mockUserProgress.activeCourse,

  // Initial progression matching mockUnits baseline
  completedLessonIds: ["u1-l1", "u1-l2", "u1-l3"],
  activeLessonId: "u1-l4",

  decrementHeart: () =>
    set((state) => ({
      hearts: Math.max(0, state.hearts - 1),
    })),

  refillHearts: () =>
    set((state) => ({
      hearts: state.maxHearts,
    })),

  addGems: (amount: number) =>
    set((state) => ({
      gems: state.gems + amount,
    })),

  incrementStreak: () =>
    set((state) => ({
      streak: state.streak + 1,
    })),

  setActiveCourse: (course: ActiveCourse) =>
    set(() => ({
      activeCourse: course,
    })),

  completeLesson: (lessonId: string, nextLessonId?: string) =>
    set((state) => {
      const alreadyCompleted = state.completedLessonIds.includes(lessonId);
      const updatedCompleted = alreadyCompleted
        ? state.completedLessonIds
        : [...state.completedLessonIds, lessonId];

      const updatedActive =
        state.activeLessonId === lessonId && nextLessonId
          ? nextLessonId
          : state.activeLessonId;

      return {
        completedLessonIds: updatedCompleted,
        activeLessonId: updatedActive,
        gems: state.gems + (alreadyCompleted ? 2 : 10),
      };
    }),

  getLessonStatus: (lessonId: string): LessonStatus => {
    const state = get();
    if (state.completedLessonIds.includes(lessonId)) {
      return "completed";
    }
    if (state.activeLessonId === lessonId) {
      return "active";
    }
    return "locked";
  },

  resetProgress: () =>
    set(() => ({
      streak: mockUserProgress.streak,
      gems: mockUserProgress.gems,
      hearts: mockUserProgress.maxHearts,
      completedLessonIds: ["u1-l1", "u1-l2", "u1-l3"],
      activeLessonId: "u1-l4",
    })),
}));
