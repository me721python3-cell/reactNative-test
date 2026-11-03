/**
 * Centralized image asset references for Lingua.
 * Follows AGENTS.md rules: all local images must be referenced via constants/images.ts.
 */

export const images = {
  mascotVoyager: require("@/assets/images/mascot_voyager.png"),
  avatarSofia: require("@/assets/images/avatar_sofia.png"),
  badgeSeptember: require("@/assets/images/badge_september.png"),
  badgeAugust: require("@/assets/images/badge_august.png"),
  badgeJuly: require("@/assets/images/badge_july.png"),
} as const;
