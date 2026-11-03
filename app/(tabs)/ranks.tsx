import { useCallback, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { MobileHeader } from "@/components/MobileHeader";
import { UserRankRow } from "@/components/UserRankRow";
import { colors } from "@/constants/theme";
import {
  LeaderboardUser,
  mockLeaderboardUsers,
  mockLeagueInfo,
} from "@/data/mockLeaderboard";
import { showGuardedAlert } from "@/lib/alertGuard";

/**
 * Visual divider separating the promotion zone (top ranks) from safe ranks.
 */
function PromotionZoneDivider({ nextLeague }: { nextLeague: string }) {
  return (
    <View className="my-3 items-center">
      <View className="w-full flex-row items-center">
        <View
          className="h-[2px] flex-1"
          style={{ backgroundColor: colors.primary }}
        />
        <View
          className="mx-3 flex-row items-center gap-1.5 rounded-full border px-3 py-1"
          style={{
            backgroundColor: "#e8fadc",
            borderColor: colors.primary,
          }}
        >
          <Ionicons name="arrow-up" size={13} color={colors.primaryDark} />
          <Text
            className="text-[11px] font-black uppercase tracking-wider"
            style={{ color: colors.primaryDark }}
          >
            Promotion Zone
          </Text>
        </View>
        <View
          className="h-[2px] flex-1"
          style={{ backgroundColor: colors.primary }}
        />
      </View>
      <Text className="mt-1 text-[11px] font-bold text-gray-500">
        Top {mockLeagueInfo.promotionRankMax} advance to {nextLeague}
      </Text>
    </View>
  );
}

/**
 * Visual divider separating the safe ranks from the demotion zone (bottom ranks).
 */
function DemotionZoneDivider({ previousLeague }: { previousLeague: string }) {
  return (
    <View className="my-3 items-center">
      <View className="w-full flex-row items-center">
        <View
          className="h-[2px] flex-1"
          style={{ backgroundColor: colors.heart }}
        />
        <View
          className="mx-3 flex-row items-center gap-1.5 rounded-full border px-3 py-1"
          style={{
            backgroundColor: "#ffdfe0",
            borderColor: colors.heart,
          }}
        >
          <Ionicons name="arrow-down" size={13} color={colors.heartDark} />
          <Text
            className="text-[11px] font-black uppercase tracking-wider"
            style={{ color: colors.heartDark }}
          >
            Demotion Zone
          </Text>
        </View>
        <View
          className="h-[2px] flex-1"
          style={{ backgroundColor: colors.heart }}
        />
      </View>
      <Text className="mt-1 text-[11px] font-bold text-gray-500">
        Bottom 3 drop to {previousLeague}
      </Text>
    </View>
  );
}

/**
 * Leaderboard / Ranks Screen
 * Displays users in the current league with Promotion and Demotion dividers,
 * highlighting the current user in tactile 3D green per Stitch specifications.
 */
export default function RanksScreen() {
  const users = useMemo(() => mockLeaderboardUsers, []);
  const league = useMemo(() => mockLeagueInfo, []);

  const handleUserPress = useCallback((user: LeaderboardUser) => {
    if (user.isCurrentUser) {
      showGuardedAlert(
        "current-user-rank",
        "Your Ranking",
        `You're in #${user.rank} place with ${user.xp.toLocaleString()} XP! Earn more XP from lessons to enter the Promotion Zone.`
      );
      return;
    }

    showGuardedAlert(
      `user-${user.id}`,
      user.name,
      `${user.name} is currently #${user.rank} with ${user.xp.toLocaleString()} XP.`
    );
  }, []);

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
      edges={["top"]}
    >
      {/* Top Mobile Header */}
      <MobileHeader />

      {/* Main Leaderboard Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* League Hero Card */}
        <View
          className="mb-4 flex-row items-center justify-between rounded-3xl border-2 border-b-4 p-4"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderBottomColor: "#cecece",
          }}
        >
          <View className="flex-1 pr-3">
            <View className="flex-row items-center gap-1.5">
              <Text
                className="text-xs font-black uppercase tracking-wider"
                style={{ color: colors.primaryDark }}
              >
                League Tier {league.tier}
              </Text>
            </View>
            <Text
              className="mt-0.5 text-2xl font-black"
              style={{ color: colors.ink }}
            >
              {league.name}
            </Text>
            <Text className="mt-1 text-xs font-bold text-gray-500">
              Top {league.promotionRankMax} advance to {league.nextLeague}
            </Text>
          </View>

          {/* League Shield & Countdown Badge */}
          <View className="items-center">
            <View
              className="h-14 w-14 items-center justify-center rounded-2xl border-2 border-b-4"
              style={{
                backgroundColor: "#e8fadc",
                borderColor: colors.primary,
                borderBottomColor: colors.primaryDark,
              }}
            >
              <Ionicons name="shield" size={30} color={colors.primary} />
            </View>
            <View
              className="mt-2 flex-row items-center gap-1 rounded-full px-2.5 py-0.5"
              style={{ backgroundColor: "#f0efef" }}
            >
              <Ionicons name="time-outline" size={12} color="#78716c" />
              <Text className="text-[11px] font-black text-gray-600">
                {league.daysLeft}d left
              </Text>
            </View>
          </View>
        </View>

        {/* Leaderboard List with Promotion & Demotion Dividers */}
        {users.map((user) => {
          const isPromotionCutoff = user.rank === league.promotionRankMax;
          const isDemotionCutoff = user.rank === league.demotionRankMin - 1;

          return (
            <View key={user.id}>
              <UserRankRow user={user} onPress={handleUserPress} />

              {/* Promotion Zone Divider after rank 3 */}
              {isPromotionCutoff && (
                <PromotionZoneDivider nextLeague={league.nextLeague} />
              )}

              {/* Demotion Zone Divider before rank 8 (after rank 7) */}
              {isDemotionCutoff && (
                <DemotionZoneDivider previousLeague={league.previousLeague} />
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
