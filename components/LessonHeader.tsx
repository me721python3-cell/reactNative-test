import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/theme";

interface LessonHeaderProps {
  progressPercentage: number;
  hearts: number;
  onClose: () => void;
}

/**
 * LessonHeader component with close button, glossy gummy-tube Progress Bar,
 * and red hearts counter per DESIGN.md specifications.
 */
export function LessonHeader({
  progressPercentage,
  hearts,
  onClose,
}: LessonHeaderProps) {
  const clampedProgress = Math.min(Math.max(progressPercentage, 0), 1);

  return (
    <View className="w-full flex-row items-center justify-between gap-4 px-5 py-3">
      {/* Close / Exit Button */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Exit lesson"
        onPress={onClose}
        className="p-1 active:opacity-70"
      >
        <Ionicons name="close" size={28} color={colors.outline} />
      </Pressable>

      {/* Gummy Progress Bar per DESIGN.md */}
      <View
        className="h-4 flex-1 overflow-hidden rounded-full"
        style={{ backgroundColor: colors.border }}
      >
        <View
          className="relative h-full overflow-hidden rounded-full"
          style={{
            width: `${Math.round(clampedProgress * 100)}%`,
            backgroundColor: colors.primary,
          }}
        >
          {/* Top-half white highlight stripe for glossy gummy-tube effect */}
          <View
            className="absolute inset-x-0 top-0 h-[45%] rounded-t-full"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.35)" }}
          />
        </View>
      </View>

      {/* Hearts Counter */}
      <View className="flex-row items-center gap-1.5">
        <Ionicons name="heart" size={24} color={colors.heart} />
        <Text
          className="text-base font-black"
          style={{ color: colors.heart }}
        >
          {hearts}
        </Text>
      </View>
    </View>
  );
}
