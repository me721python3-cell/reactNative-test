import { colors } from "@/constants/theme";

export interface SocialProvider {
  id: "google" | "apple" | "facebook";
  label: string;
  /** Simple monogram fallback until real brand icons/assets are added. */
  monogram: string;
  textColor: string;
  bg: string;
}

export const mockSocialProviders: SocialProvider[] = [
  { id: "google", label: "Continue with Google", monogram: "G", textColor: "#4285f4", bg: colors.surface },
  { id: "apple", label: "Continue with Apple", monogram: "", textColor: colors.onPrimary, bg: colors.ink },
  { id: "facebook", label: "Continue with Facebook", monogram: "f", textColor: "#1877f2", bg: colors.surface },
];
