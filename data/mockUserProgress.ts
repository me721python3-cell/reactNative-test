/**
 * Typed mock data for user progress indicators (Streak, Gems, Hearts, Active Course).
 * Used by MobileHeader and profile per AGENTS.md data mocking rules.
 */

export interface ActiveCourse {
  id: string;
  title: string;
  flag: string;
}

export type StatType = "streak" | "gems" | "hearts";

export interface HeaderStatItem {
  id: StatType;
  label: string;
  value: number;
  icon: "flame" | "diamond" | "heart";
  color: string;
  shadowColor: string;
}

export interface UserProgressData {
  streak: number;
  gems: number;
  hearts: number;
  maxHearts: number;
  activeCourse: ActiveCourse;
}

export const mockUserProgress: UserProgressData = {
  streak: 14,
  gems: 480,
  hearts: 5,
  maxHearts: 5,
  activeCourse: {
    id: "es",
    title: "Spanish",
    flag: "🇪🇸",
  },
};
