/** Typed mock quests for the Quests screen. */

export interface MockQuest {
  id: string;
  title: string;
  /** Progress toward the goal, from 0 to goal. */
  progress: number;
  goal: number;
}

export const mockQuests: MockQuest[] = [
  { id: "q1", title: "Earn 20 XP", progress: 12, goal: 20 },
  { id: "q2", title: "Complete 2 lessons", progress: 1, goal: 2 },
  { id: "q3", title: "Practice 5 minutes", progress: 3, goal: 5 },
  { id: "q4", title: "Get 5 correct in a row", progress: 5, goal: 5 },
  { id: "q5", title: "Review 3 mistakes", progress: 0, goal: 3 },
];
