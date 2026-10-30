import { Pressable, Text, View } from "react-native";

import { colors } from "@/constants/theme";
import { Challenge } from "@/data/mockChallenges";

export type OptionState = "resting" | "selected" | "correct" | "incorrect";

interface ChallengeCardProps {
  challenge: Challenge;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  status?: "none" | "success" | "error";
  disabled?: boolean;
}

const STATE_STYLES: Record<
  OptionState,
  {
    bg: string;
    border: string;
    bevel: string;
    text: string;
    badgeBorder: string;
  }
> = {
  resting: {
    bg: colors.surface,
    border: colors.border,
    bevel: colors.border,
    text: colors.ink,
    badgeBorder: colors.border,
  },
  selected: {
    bg: colors.cardSelectedBg,
    border: colors.cardSelectedBorder,
    bevel: colors.cardSelectedDark,
    text: colors.cardSelectedBorder,
    badgeBorder: colors.cardSelectedBorder,
  },
  correct: {
    bg: colors.cardCorrectBg,
    border: colors.cardCorrectBorder,
    bevel: colors.cardCorrectDark,
    text: colors.cardCorrectBorder,
    badgeBorder: colors.cardCorrectBorder,
  },
  incorrect: {
    bg: colors.cardErrorBg,
    border: colors.cardErrorBorder,
    bevel: colors.cardErrorDark,
    text: colors.cardErrorBorder,
    badgeBorder: colors.cardErrorBorder,
  },
};

/**
 * ChallengeCard component for SELECT challenges.
 * Shows the question prompt and a 2x2 grid of tactile 3D option cards.
 * Adheres to Stitch design states: resting, selected, correct, and incorrect.
 */
export function ChallengeCard({
  challenge,
  selectedOptionId,
  onSelectOption,
  status = "none",
  disabled = false,
}: ChallengeCardProps) {
  return (
    <View className="w-full px-5 py-4">
      {/* Question Header */}
      <Text
        className="mb-8 text-2xl font-black leading-8 tracking-tight"
        style={{ color: colors.ink }}
      >
        {challenge.question}
      </Text>

      {/* 2x2 Options Grid */}
      <View className="flex-row flex-wrap justify-between gap-y-4">
        {challenge.options.map((option) => {
          const isSelected = selectedOptionId === option.id;

          let optionState: OptionState = "resting";
          if (isSelected) {
            if (status === "success") {
              optionState = "correct";
            } else if (status === "error") {
              optionState = "incorrect";
            } else {
              optionState = "selected";
            }
          }

          const style = STATE_STYLES[optionState];

          return (
            <Pressable
              key={option.id}
              disabled={disabled}
              accessibilityRole="button"
              accessibilityLabel={option.text}
              accessibilityState={{ selected: isSelected, disabled }}
              onPress={() => onSelectOption(option.id)}
              className={`min-h-[140px] w-[48%] items-center justify-between rounded-2xl border-2 border-b-4 p-4 ${
                !disabled ? "active:translate-y-1 active:border-b-2" : ""
              }`}
              style={{
                backgroundColor: style.bg,
                borderColor: style.border,
                borderBottomColor: style.bevel,
              }}
            >
              {/* Illustration / Emoji */}
              <View className="my-2 flex-1 items-center justify-center">
                <Text className="text-5xl">{option.image}</Text>
              </View>

              {/* Text label and number badge */}
              <View className="w-full flex-row items-center justify-between pt-2">
                <Text
                  className="text-base font-extrabold tracking-wide"
                  style={{ color: style.text }}
                >
                  {option.text}
                </Text>
                <View
                  className="h-6 w-6 items-center justify-center rounded-lg border-2"
                  style={{ borderColor: style.badgeBorder }}
                >
                  <Text
                    className="text-xs font-black"
                    style={{ color: style.text }}
                  >
                    {option.shortcut}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
