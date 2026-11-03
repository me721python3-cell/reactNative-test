import { Ionicons } from "@expo/vector-icons";

import { images } from "@/constants/images";

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
  progressWidthClass: string;
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

export type PastBadgeImageKey = keyof typeof images;

export interface PastBadge {
  id: string;
  month: string;
  title: string;
  unlocked: boolean;
  glowColor: string;
  imageKey?: PastBadgeImageKey;
}

/**
 * 3 Daily Quests directly matching the Stitch design specification.
 */
export const mockDailyQuests: DailyQuest[] = [
  {
    id: "q1",
    title: "Earn 50 XP",
    progress: 50,
    goal: 50,
    iconName: "flash",
    iconBgColor: "rgba(88, 204, 2, 0.2)",
    iconColor: "#2b6c00",
    progressColor: "#58cc02",
    progressWidthClass: "w-full",
    rewardType: "claim",
    rewardLabel: "Claim",
    claimed: false,
  },
  {
    id: "q2",
    title: "Score 90%+ in 3 lessons",
    progress: 2,
    goal: 3,
    iconName: "locate-outline",
    iconBgColor: "rgba(254, 199, 0, 0.2)",
    iconColor: "#755b00",
    progressColor: "#fec700",
    progressWidthClass: "w-2/3",
    rewardType: "boost",
    rewardLabel: "15m 2x",
  },
  {
    id: "q3",
    title: "Spend 15 mins learning",
    progress: 11,
    goal: 15,
    iconName: "alarm-outline",
    iconBgColor: "rgba(74, 189, 255, 0.2)",
    iconColor: "#006590",
    progressColor: "#4abdff",
    progressWidthClass: "w-[73%]",
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

/** Past Badges directly referencing Stitch badge images */
export const mockPastBadges: PastBadge[] = [
  {
    id: "b1",
    month: "September",
    title: "Harvest Champ",
    unlocked: true,
    glowColor: "#ffdf92",
    imageKey: "badgeSeptember",
  },
  {
    id: "b2",
    month: "August",
    title: "Sunburst Hero",
    unlocked: true,
    glowColor: "#fec700",
    imageKey: "badgeAugust",
  },
  {
    id: "b3",
    month: "July",
    title: "Sparkle Master",
    unlocked: true,
    glowColor: "#c8e6ff",
    imageKey: "badgeJuly",
  },
  {
    id: "b4",
    month: "November",
    title: "Unlocks soon",
    unlocked: false,
    glowColor: "#e9e8e7",
  },
];

export const mockPastBadgesEarnedCount = 8;
