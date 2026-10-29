/** Typed mock users for the Ranks (leaderboard) screen. */

export interface MockUser {
  id: string;
  name: string;
  xp: number;
  streak: number;
  /** Static avatar seed; swap for real images in assets/images later. */
  avatarColor: string;
}

/** Sorted by XP descending — the reference app ranks users the same way. */
export const mockLeaderboardUsers: MockUser[] = [
  { id: "u1", name: "Maria", xp: 2450, streak: 31, avatarColor: "#58cc02" },
  { id: "u2", name: "James", xp: 2210, streak: 12, avatarColor: "#1cb0f6" },
  { id: "u3", name: "Aiko", xp: 1980, streak: 22, avatarColor: "#ff86d0" },
  { id: "u4", name: "Diego", xp: 1740, streak: 8, avatarColor: "#ffb900" },
  { id: "u5", name: "Sara", xp: 1495, streak: 15, avatarColor: "#ce82ff" },
  { id: "u6", name: "Tom", xp: 1220, streak: 4, avatarColor: "#00cd9c" },
  { id: "u7", name: "Nina", xp: 980, streak: 9, avatarColor: "#ff9a5a" },
  { id: "u8", name: "Ling", xp: 640, streak: 3, avatarColor: "#84d900" },
  { id: "u9", name: "Omar", xp: 410, streak: 6, avatarColor: "#2b70c9" },
  { id: "u10", name: "Emma", xp: 250, streak: 1, avatarColor: "#e6567a" },
];
