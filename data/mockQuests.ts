import { Ionicons } from "@expo/vector-icons";

/**
 * Typed mock quests and challenges for the Quests screen.
 * Follows AGENTS.md data mocking guidelines and Stitch design specifications.
 */

export interface MockQuest {
  id: string;
  title: string;
  /** Progress toward the goal, from 0 to goal. */
  progress: number;
  goal: number;
}

export interface DailyQuest extends MockQuest {
  iconName: keyof typeof Ionicons.glyphMap;
  iconBgColor: string;
  iconColor: string;
  progressColor: string;
  rewardType: "claim" | "boost" | "gems";
  rewardLabel: string;
  claimed?: boolean;
}

export interface MonthlyMilestone {
  at: number;
  unlocked: boolean;
}

export interface MonthlyChallenge {
  month: string;
  title: string;
  subtitle: string;
  progress: number;
  goal: number;
  daysLeft: number;
  rewards: {
    gems: number;
    boost: string;
  };
  milestones: MonthlyMilestone[];
}

export interface FriendsQuest {
  title: string;
  partnerName: string;
  daysLeft: number;
  partnerProgress: number;
  userProgress: number;
  goal: number;
  rewardTitle: string;
}

export interface PastBadge {
  id: string;
  month: string;
  title: string;
  unlocked: boolean;
  badgeBgColor: string;
  iconColor: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

/**
 * 3 Daily Quests matching Stitch design reference.
 */
export const mockDailyQuests: DailyQuest[] = [
  {
    id: "q1",
    title: "Earn 50 XP",
    progress: 50,
    goal: 50,
    iconName: "flash",
    iconBgColor: "#e8fadc",
    iconColor: "#58cc02",
    progressColor: "#58cc02",
    rewardType: "claim",
    rewardLabel: "Claim",
    claimed: false,
  },
  {
    id: "q2",
    title: "Score 90%+ in 3 lessons",
    progress: 2,
    goal: 3,
    iconName: "star",
    iconBgColor: "#fff7d6",
    iconColor: "#e5b400",
    progressColor: "#ffc800",
    rewardType: "boost",
    rewardLabel: "15m 2x",
  },
  {
    id: "q3",
    title: "Spend 15 mins learning",
    progress: 11,
    goal: 15,
    iconName: "time",
    iconBgColor: "#ddf4ff",
    iconColor: "#1899d6",
    progressColor: "#1cb0f6",
    rewardType: "gems",
    rewardLabel: "+20",
  },
];

/** Backwards compatible alias */
export const mockQuests: MockQuest[] = mockDailyQuests;

/** Monthly Badge Challenge */
export const mockMonthlyChallenge: MonthlyChallenge = {
  month: "October",
  title: "Cosmic Voyager Badge",
  subtitle: "Complete quests this month to earn rare rewards!",
  progress: 24,
  goal: 30,
  daysLeft: 6,
  rewards: {
    gems: 100,
    boost: "2x XP (1h)",
  },
  milestones: [
    { at: 10, unlocked: true },
    { at: 20, unlocked: true },
    { at: 30, unlocked: false },
  ],
};

/** Friends Quest */
export const mockFriendsQuest: FriendsQuest = {
  title: "Complete 35 perfect lessons together",
  partnerName: "Sofia M.",
  daysLeft: 3,
  partnerProgress: 16,
  userProgress: 12,
  goal: 35,
  rewardTitle: "100 Gems + 30m Boost",
};

/** Past Badges (2x2 grid) */
export const mockPastBadges: PastBadge[] = [
  {
    id: "b1",
    month: "September",
    title: "Harvest Champ",
    unlocked: true,
    badgeBgColor: "#fff4cc",
    iconColor: "#d97706",
    iconName: "ribbon",
  },
  {
    id: "b2",
    month: "August",
    title: "Sunburst Hero",
    unlocked: true,
    badgeBgColor: "#ffe8cc",
    iconColor: "#ea580c",
    iconName: "sunny",
  },
  {
    id: "b3",
    month: "July",
    title: "Sparkle Master",
    unlocked: true,
    badgeBgColor: "#ddf4ff",
    iconColor: "#0284c7",
    iconName: "sparkles",
  },
  {
    id: "b4",
    month: "November",
    title: "Unlocks soon",
    unlocked: false,
    badgeBgColor: "#f3f4f6",
    iconColor: "#9ca3af",
    iconName: "lock-closed",
  },
];

export const mockPastBadgesEarnedCount = 8;
