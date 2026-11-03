import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/theme";
import type { LeaderboardUser } from "@/data/mockLeaderboard";

interface UserRankRowProps {
  user: LeaderboardUser;
  onPress?: (user: LeaderboardUser) => void;
}

/**
 * Renders a single row in the Leaderboard list.
 * Highlights the current user with tactile 3D green styling per AGENTS.md.
 */
export const UserRankRow = memo(function UserRankRow({
  user,
  onPress,
}: UserRankRowProps) {
  const isCurrent = Boolean(user.isCurrentUser);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${user.name}, Rank ${user.rank}, ${user.xp} XP${
        isCurrent ? ", You" : ""
      }`}
      onPress={() => onPress?.(user)}
      className="mb-2.5 flex-row items-center rounded-2xl border-2 border-b-4 px-3.5 py-3 active:translate-y-0.5 active:border-b-2"
      style={{
        backgroundColor: isCurrent ? "#f0fbe8" : colors.surface,
        borderColor: isCurrent ? colors.primary : colors.border,
        borderBottomColor: isCurrent ? colors.primaryDark : "#cecece",
      }}
    >
      {/* Rank badge / number */}
      <View className="w-9 items-center justify-center">
        {user.rank === 1 ? (
          <View
            className="h-8 w-8 items-center justify-center rounded-full border-2 border-b-3"
            style={{
              backgroundColor: colors.gold,
              borderColor: colors.goldDark,
            }}
          >
            <Ionicons name="trophy" size={16} color="#ffffff" />
          </View>
        ) : user.rank === 2 ? (
          <View
            className="h-8 w-8 items-center justify-center rounded-full border-2 border-b-3"
            style={{
              backgroundColor: "#d1d5db",
              borderColor: "#9ca3af",
            }}
          >
            <Text className="text-xs font-black text-gray-700">2</Text>
          </View>
        ) : user.rank === 3 ? (
          <View
            className="h-8 w-8 items-center justify-center rounded-full border-2 border-b-3"
            style={{
              backgroundColor: "#fbd38d",
              borderColor: "#dd6b20",
            }}
          >
            <Text className="text-xs font-black text-amber-900">3</Text>
          </View>
        ) : (
          <Text
            className="text-base font-black"
            style={{ color: isCurrent ? colors.primaryDark : "#78716c" }}
          >
            {user.rank}
          </Text>
        )}
      </View>

      {/* Avatar */}
      <View
        className="ml-2 h-11 w-11 items-center justify-center rounded-full border-2"
        style={{
          backgroundColor: user.avatarColor,
          borderColor: isCurrent ? colors.primaryDark : "rgba(0,0,0,0.06)",
        }}
      >
        <Text className="text-base font-black text-white">
          {user.avatarInitial}
        </Text>
      </View>

      {/* User name & streak/trend */}
      <View className="ml-3 flex-1 justify-center">
        <View className="flex-row items-center gap-2">
          <Text
            className="text-base font-extrabold"
            style={{ color: isCurrent ? colors.primaryDark : colors.ink }}
            numberOfLines={1}
          >
            {user.name}
          </Text>
          {isCurrent && (
            <View
              className="rounded-md px-1.5 py-0.5"
              style={{ backgroundColor: "#d7ffb8" }}
            >
              <Text
                className="text-[10px] font-black uppercase tracking-wider"
                style={{ color: colors.primaryDark }}
              >
                YOU
              </Text>
            </View>
          )}
        </View>

        {/* Sub-meta: streak or movement trend */}
        <View className="mt-0.5 flex-row items-center gap-1.5">
          {user.streak !== undefined && user.streak > 0 && (
            <View className="flex-row items-center gap-0.5">
              <Ionicons name="flame" size={13} color={colors.streak} />
              <Text
                className="text-xs font-extrabold"
                style={{ color: colors.streak }}
              >
                {user.streak}d
              </Text>
            </View>
          )}
          {user.trend === "up" && (
            <Ionicons name="caret-up" size={12} color={colors.primary} />
          )}
          {user.trend === "down" && (
            <Ionicons name="caret-down" size={12} color={colors.heart} />
          )}
        </View>
      </View>

      {/* XP score */}
      <View className="items-end">
        <Text
          className="text-sm font-black"
          style={{ color: isCurrent ? colors.primaryDark : colors.ink }}
        >
          {user.xp.toLocaleString()} XP
        </Text>
      </View>
    </Pressable>
  );
});
