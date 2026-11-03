/**
 * Typed mock data for the Leaderboard (Ranks) screen.
 * Follows AGENTS.md data mocking guidelines and Stitch design specifications.
 */

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  xp: number;
  avatarColor: string;
  avatarInitial: string;
  isCurrentUser?: boolean;
  streak?: number;
  trend?: "up" | "down" | "same";
}

export interface LeagueInfo {
  name: string;
  tier: number;
  daysLeft: number;
  promotionRankMax: number;
  demotionRankMin: number;
  nextLeague: string;
  previousLeague: string;
}

export const mockLeagueInfo: LeagueInfo = {
  name: "Emerald League",
  tier: 6,
  daysLeft: 2,
  promotionRankMax: 3,
  demotionRankMin: 8,
  nextLeague: "Sapphire League",
  previousLeague: "Ruby League",
};

/**
 * 10 Leaderboard users sorted by rank (1 to 10).
 * Ranks 1-3: Promotion Zone
 * Ranks 4-7: Safe Zone (Current user at Rank 5)
 * Ranks 8-10: Demotion Zone
 */
export const mockLeaderboardUsers: LeaderboardUser[] = [
  {
    id: "u1",
    rank: 1,
    name: "Maria Santos",
    xp: 2450,
    avatarColor: "#58cc02",
    avatarInitial: "M",
    streak: 31,
    trend: "same",
  },
  {
    id: "u2",
    rank: 2,
    name: "James Wilson",
    xp: 2210,
    avatarColor: "#1cb0f6",
    avatarInitial: "J",
    streak: 12,
    trend: "up",
  },
  {
    id: "u3",
    rank: 3,
    name: "Aiko Tanaka",
    xp: 1980,
    avatarColor: "#ff86d0",
    avatarInitial: "A",
    streak: 22,
    trend: "up",
  },
  {
    id: "u4",
    rank: 4,
    name: "Diego Ramos",
    xp: 1740,
    avatarColor: "#ffb900",
    avatarInitial: "D",
    streak: 8,
    trend: "down",
  },
  {
    id: "u5",
    rank: 5,
    name: "You",
    xp: 1495,
    avatarColor: "#58cc02",
    avatarInitial: "Y",
    isCurrentUser: true,
    streak: 14,
    trend: "up",
  },
  {
    id: "u6",
    rank: 6,
    name: "Tom Miller",
    xp: 1220,
    avatarColor: "#00cd9c",
    avatarInitial: "T",
    streak: 4,
    trend: "down",
  },
  {
    id: "u7",
    rank: 7,
    name: "Nina Kowalski",
    xp: 980,
    avatarColor: "#ff9a5a",
    avatarInitial: "N",
    streak: 9,
    trend: "same",
  },
  {
    id: "u8",
    rank: 8,
    name: "Ling Chen",
    xp: 640,
    avatarColor: "#84d900",
    avatarInitial: "L",
    streak: 3,
    trend: "down",
  },
  {
    id: "u9",
    rank: 9,
    name: "Omar Al-Mansoor",
    xp: 410,
    avatarColor: "#2b70c9",
    avatarInitial: "O",
    streak: 6,
    trend: "down",
  },
  {
    id: "u10",
    rank: 10,
    name: "Emma Davis",
    xp: 250,
    avatarColor: "#e6567a",
    avatarInitial: "E",
    streak: 1,
    trend: "down",
  },
];
