import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/theme";
import {
  HeaderStatItem,
  mockUserProgress,
  StatType,
  UserProgressData,
} from "@/data/mockUserProgress";
import { useAppStore } from "@/store/useAppStore";

interface MobileHeaderProps {
  progress?: UserProgressData;
  onStatPress?: (stat: StatType) => void;
  onPressCourse?: () => void;
}

/**
 * Duolingo-style MobileHeader showing active course, streak, gems, and hearts.
 * Built with tactile 3D chips per AGENTS.md and DESIGN.md.
 */
export function MobileHeader({
  progress: customProgress,
  onStatPress,
  onPressCourse,
}: MobileHeaderProps) {
  const storeStreak = useAppStore((state) => state.streak);
  const storeGems = useAppStore((state) => state.gems);
  const storeHearts = useAppStore((state) => state.hearts);
  const storeMaxHearts = useAppStore((state) => state.maxHearts);
  const storeCourse = useAppStore((state) => state.activeCourse);

  const progress: UserProgressData = customProgress ?? {
    streak: storeStreak,
    gems: storeGems,
    hearts: storeHearts,
    maxHearts: storeMaxHearts,
    activeCourse: storeCourse,
  };
  const stats: HeaderStatItem[] = [
    {
      id: "streak",
      label: "Streak",
      value: progress.streak,
      icon: "flame",
      color: colors.streak,
      shadowColor: colors.streakDark,
    },
    {
      id: "gems",
      label: "Gems",
      value: progress.gems,
      icon: "diamond",
      color: colors.gem,
      shadowColor: colors.gemDark,
    },
    {
      id: "hearts",
      label: "Hearts",
      value: progress.hearts,
      icon: "heart",
      color: colors.heart,
      shadowColor: colors.heartDark,
    },
  ];

  return (
    <View
      className="w-full flex-row items-center justify-between border-b-2 px-4 py-2.5"
      style={{
        backgroundColor: colors.surface,
        borderBottomColor: colors.border,
      }}
    >
      {/* Active course flag selector */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Current course: ${progress.activeCourse.title}`}
        onPress={onPressCourse}
        className="flex-row items-center gap-1 rounded-xl border-2 border-b-4 px-2.5 py-1 active:translate-y-0.5 active:border-b-2"
        style={{
          borderColor: colors.border,
          backgroundColor: colors.surface,
        }}
      >
        <Text className="text-base">{progress.activeCourse.flag}</Text>
      </Pressable>

      {/* Gamification stats: Streak, Gems, Hearts */}
      <View className="flex-row items-center gap-2">
        {stats.map((stat) => (
          <Pressable
            key={stat.id}
            accessibilityRole="button"
            accessibilityLabel={`${stat.label}: ${stat.value}`}
            onPress={() => onStatPress?.(stat.id)}
            className="flex-row items-center gap-1.5 rounded-xl border-2 border-b-4 px-2.5 py-1 active:translate-y-0.5 active:border-b-2"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.surface,
            }}
          >
            <Ionicons name={stat.icon} size={18} color={stat.color} />
            <Text
              className="text-sm font-extrabold"
              style={{ color: stat.color }}
            >
              {stat.value}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
