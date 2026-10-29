/**
 * Global design tokens for Lingua.
 * Single source of truth for colors — reference via NativeWind arbitrary
 * values (e.g. bg-surface) or import for StyleSheet needs.
 */
export const colors = {
  background: "#fbf9f9",
  surface: "#ffffff",
  surfaceDim: "#dbdad9",
  field: "#f0efef",
  ink: "#1b1c1c",
  onSurfaceVariant: "#3f4a36",
  outline: "#6f7b64",
  outlineVariant: "#becbb1",

  border: "#e5e5e5",

  primary: "#58cc02",
  primaryDark: "#46a302",
  onPrimary: "#ffffff",
  primaryContainer: "#87fe45",

  secondaryFixed: "#ffdf92",
  onSecondaryFixed: "#241a00",
  onSecondaryFixedVariant: "#594400",

  tertiary: "#006590",

  error: "#ba1a1a",

  // Game status tokens per DESIGN.md
  streak: "#ff9600",
  streakDark: "#e08500",
  gem: "#1cb0f6",
  gemDark: "#1899d6",
  heart: "#ff4b4b",
  heartDark: "#ea2b2b",

  // LessonNode & Unit tokens (DESIGN.md)
  gold: "#ffc800",
  goldDark: "#e5b400",
  locked: "#e5e5e5",
  lockedDark: "#cecece",
  lockedIcon: "#afafaf",
} as const;

/** Radii used across buttons, cards and inputs (per Stitch designs). */
export const radii = {
  input: 14,
  button: 16,
  card: 16,
} as const;

/** Standard control heights — keep every tappable element >= 44px. */
export const sizes = {
  button: 48,
  input: 52,
  icon: 22,
} as const;
