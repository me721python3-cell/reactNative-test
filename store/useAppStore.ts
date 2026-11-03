import { create } from "zustand";

import {
  DEFAULT_LESSON_ID,
  GEM_FIRST_COMPLETE_REWARD,
  GEM_REPLAY_REWARD,
  INITIAL_COMPLETED_LESSON_IDS,
} from "@/constants/progression";
import type { LessonStatus } from "@/data/mockUnits";
import { ActiveCourse, mockUserProgress } from "@/data/mockUserProgress";

export interface AppState {
  streak: number;
  gems: number;
  hearts: number;
  maxHearts: number;
  activeCourse: ActiveCourse;

  // Lesson progression
  completedLessonIds: ReadonlySet<string>;
  activeLessonId: string;

  // Actions
  decrementHeart: () => void;
  refillHearts: () => void;
  addGems: (amount: number) => void;
  incrementStreak: () => void;
  setActiveCourse: (course: ActiveCourse) => void;
  completeLesson: (lessonId: string, nextLessonId?: string) => void;
  resetProgress: () => void;
}

export interface ResolveLessonStatusArgs {
  lessonId: string;
  completedLessonIds: ReadonlySet<string>;
  activeLessonId?: string;
}

/**
 * Single source of truth for resolving a lesson's progression status.
 * Requires a ReadonlySet for O(1) lookup performance along the learning path.
 */
export function resolveLessonStatus({
  lessonId,
  completedLessonIds,
  activeLessonId,
}: ResolveLessonStatusArgs): LessonStatus {
  if (completedLessonIds.has(lessonId)) {
    return "completed";
  }
  if (activeLessonId === lessonId) {
    return "active";
  }
  return "locked";
}

export const useAppStore = create<AppState>((set) => ({
  streak: mockUserProgress.streak,
  gems: mockUserProgress.gems,
  hearts: mockUserProgress.hearts,
  maxHearts: mockUserProgress.maxHearts,
  activeCourse: mockUserProgress.activeCourse,

  // Initial progression matching mockUnits baseline
  completedLessonIds: new Set(INITIAL_COMPLETED_LESSON_IDS),
  activeLessonId: DEFAULT_LESSON_ID,

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
      const alreadyCompleted = state.completedLessonIds.has(lessonId);
      const updatedCompleted = alreadyCompleted
        ? state.completedLessonIds
        : new Set([...state.completedLessonIds, lessonId]);

      const updatedActive =
        state.activeLessonId === lessonId && nextLessonId
          ? nextLessonId
          : state.activeLessonId;

      return {
        completedLessonIds: updatedCompleted,
        activeLessonId: updatedActive,
        gems: state.gems + (alreadyCompleted ? GEM_REPLAY_REWARD : GEM_FIRST_COMPLETE_REWARD),
      };
    }),

  resetProgress: () =>
    set(() => ({
      streak: mockUserProgress.streak,
      gems: mockUserProgress.gems,
      hearts: mockUserProgress.maxHearts,
      completedLessonIds: new Set(INITIAL_COMPLETED_LESSON_IDS),
      activeLessonId: DEFAULT_LESSON_ID,
    })),
}));
