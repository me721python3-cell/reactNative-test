import { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { MobileHeader } from "@/components/MobileHeader";
import { colors } from "@/constants/theme";
import {
  DailyQuest,
  mockDailyQuests,
  mockFriendsQuest,
  mockMonthlyChallenge,
  mockPastBadges,
  mockPastBadgesEarnedCount,
  PastBadge,
} from "@/data/mockQuests";
import { showGuardedAlert } from "@/lib/alertGuard";
import { useAppStore } from "@/store/useAppStore";

/**
 * Monthly Badge Challenge Hero Card
 * Replicates the Cosmic Voyager Badge card from Stitch reference with milestones.
 */
function MonthlyChallengeCard() {
  const challenge = mockMonthlyChallenge;
  const progressPct = Math.min(
    100,
    Math.round((challenge.progress / challenge.goal) * 100)
  );

  return (
    <View
      className="mb-5 rounded-3xl border-2 border-b-4 p-4"
      style={{
        backgroundColor: "#f4faff",
        borderColor: "#bae6fd",
        borderBottomColor: "#7dd3fc",
      }}
    >
      {/* Top Tag Pills */}
      <View className="flex-row items-center justify-between">
        <View
          className="rounded-full px-3 py-1"
          style={{ backgroundColor: "#e0f2fe" }}
        >
          <Text
            className="text-[11px] font-black uppercase tracking-wider"
            style={{ color: "#0369a1" }}
          >
            • {challenge.month} Challenge
          </Text>
        </View>

        <View
          className="flex-row items-center gap-1 rounded-full px-2.5 py-1"
          style={{ backgroundColor: "#fef3c7" }}
        >
          <Ionicons name="time-outline" size={12} color="#92400e" />
          <Text className="text-[11px] font-extrabold" style={{ color: "#92400e" }}>
            {challenge.daysLeft} days left
          </Text>
        </View>
      </View>

      {/* Main Badge Hero Details */}
      <View className="mt-4 flex-row items-center">
        {/* Emblem Avatar with star badge */}
        <View className="relative">
          <View
            className="h-20 w-20 items-center justify-center rounded-full border-4"
            style={{
              backgroundColor: "#bae6fd",
              borderColor: "#7dd3fc",
            }}
          >
            <Ionicons name="planet" size={38} color="#0284c7" />
          </View>
          <View
            className="absolute bottom-0 right-0 h-6 w-6 items-center justify-center rounded-full border-2"
            style={{
              backgroundColor: colors.gold,
              borderColor: colors.goldDark,
            }}
          >
            <Ionicons name="star" size={12} color="#ffffff" />
          </View>
        </View>

        {/* Challenge title & rewards */}
        <View className="ml-3.5 flex-1">
          <Text
            className="text-lg font-black leading-tight"
            style={{ color: colors.ink }}
          >
            {challenge.title}
          </Text>
          <Text className="mt-1 text-xs font-bold leading-snug text-gray-500">
            {challenge.subtitle}
          </Text>

          {/* Reward Badges */}
          <View className="mt-2.5 flex-row items-center gap-2">
            <View
              className="flex-row items-center gap-1 rounded-full border px-2.5 py-0.5"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              <Ionicons name="diamond" size={12} color={colors.gem} />
              <Text className="text-xs font-black" style={{ color: colors.ink }}>
                {challenge.rewards.gems}
              </Text>
            </View>

            <View
              className="flex-row items-center gap-1 rounded-full border px-2.5 py-0.5"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              <Ionicons name="flash" size={12} color={colors.streak} />
              <Text
                className="text-xs font-black"
                style={{ color: colors.streakDark }}
              >
                {challenge.rewards.boost}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quest Progress Bar with Milestone Checkpoints */}
      <View className="mt-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-xs font-extrabold text-gray-600">
            Quest Progress
          </Text>
          <Text
            className="text-xs font-black"
            style={{ color: colors.primaryDark }}
          >
            {challenge.progress} / {challenge.goal} completed
          </Text>
        </View>

        {/* Bar */}
        <View
          className="relative mt-2 h-3.5 w-full rounded-full overflow-hidden"
          style={{ backgroundColor: "#e5e7eb" }}
        >
          <View
            className="h-full rounded-full"
            style={{
              width: `${progressPct}%`,
              backgroundColor: colors.primary,
            }}
          />
        </View>

        {/* Milestone Markers */}
        <View className="mt-1.5 flex-row items-center justify-between px-1">
          <Text className="text-[10px] font-extrabold text-gray-400">Start</Text>
          <View className="flex-row items-center gap-0.5">
            <Ionicons name="checkmark-circle" size={12} color={colors.primary} />
            <Text
              className="text-[10px] font-black"
              style={{ color: colors.primaryDark }}
            >
              10
            </Text>
          </View>
          <View className="flex-row items-center gap-0.5">
            <Ionicons name="checkmark-circle" size={12} color={colors.primary} />
            <Text
              className="text-[10px] font-black"
              style={{ color: colors.primaryDark }}
            >
              20
            </Text>
          </View>
          <View className="flex-row items-center gap-0.5">
            <Ionicons name="lock-closed" size={11} color={colors.goldDark} />
            <Text
              className="text-[10px] font-black"
              style={{ color: colors.goldDark }}
            >
              30 Quests
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Individual Daily Quest Card
 * Displays quest progress bar and either tactile 3D Claim button or reward pill.
 */
function DailyQuestCard({
  quest,
  onClaim,
}: {
  quest: DailyQuest;
  onClaim: (id: string) => void;
}) {
  const pct = Math.min(100, Math.round((quest.progress / quest.goal) * 100));
  const isClaimable = quest.progress >= quest.goal && !quest.claimed;
  const isClaimed = Boolean(quest.claimed);

  return (
    <View
      className="mb-3 flex-row items-center rounded-2xl border-2 border-b-4 p-3.5"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderBottomColor: "#cecece",
      }}
    >
      {/* Icon Circle */}
      <View
        className="h-12 w-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: quest.iconBgColor }}
      >
        <Ionicons name={quest.iconName} size={24} color={quest.iconColor} />
      </View>

      {/* Progress & Quest Info */}
      <View className="ml-3 flex-1 pr-2">
        <View className="flex-row items-center justify-between">
          <Text
            className="text-sm font-extrabold"
            style={{ color: colors.ink }}
            numberOfLines={1}
          >
            {quest.title}
          </Text>
          <Text className="text-xs font-bold text-gray-500">
            {quest.progress} / {quest.goal}
          </Text>
        </View>

        {/* Progress Bar */}
        <View
          className="mt-2 h-2.5 w-full rounded-full overflow-hidden"
          style={{ backgroundColor: "#f0efef" }}
        >
          <View
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              backgroundColor: isClaimed ? "#9ca3af" : quest.progressColor,
            }}
          />
        </View>
      </View>

      {/* Action: 3D Claim Button or Reward Indicator */}
      {isClaimable ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Claim reward for ${quest.title}`}
          onPress={() => onClaim(quest.id)}
          className="rounded-xl border-b-4 px-4 py-2 active:translate-y-1 active:border-b-0"
          style={{
            backgroundColor: colors.primary,
            borderBottomColor: colors.primaryDark,
          }}
        >
          <Text className="text-xs font-black uppercase tracking-wider text-white">
            Claim
          </Text>
        </Pressable>
      ) : isClaimed ? (
        <View
          className="flex-row items-center gap-1 rounded-xl px-3 py-1.5"
          style={{ backgroundColor: "#f0efef" }}
        >
          <Ionicons name="checkmark-done" size={14} color={colors.primary} />
          <Text className="text-xs font-black text-gray-500">Claimed</Text>
        </View>
      ) : (
        <View
          className="h-10 w-12 items-center justify-center rounded-xl border"
          style={{
            backgroundColor: "#f9fafb",
            borderColor: colors.border,
          }}
        >
          {quest.rewardType === "boost" ? (
            <View className="items-center">
              <Ionicons name="time" size={14} color="#78716c" />
              <Text className="text-[10px] font-black text-gray-600">15m 2x</Text>
            </View>
          ) : (
            <View className="items-center">
              <Text className="text-xs font-black text-gray-600">
                {quest.rewardLabel}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

/**
 * Friends Quest Section Card
 * Features partner avatar, split progress bar, and tactile 3D Nudge button.
 */
function FriendsQuestCard() {
  const friendsQuest = mockFriendsQuest;
  const [nudged, setNudged] = useState(false);

  const totalProgress = friendsQuest.partnerProgress + friendsQuest.userProgress;
  const partnerPct = (friendsQuest.partnerProgress / friendsQuest.goal) * 100;
  const userPct = (friendsQuest.userProgress / friendsQuest.goal) * 100;

  const handleNudge = useCallback(() => {
    setNudged(true);
    showGuardedAlert(
      "nudge-friend",
      `Nudged ${friendsQuest.partnerName}! 💬`,
      `We sent an encouraging ping to ${friendsQuest.partnerName} to complete today's lessons!`
    );
  }, [friendsQuest.partnerName]);

  return (
    <View
      className="mb-5 rounded-3xl border-2 border-b-4 p-4"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderBottomColor: "#cecece",
      }}
    >
      {/* Top Header */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="people" size={18} color={colors.tertiary} />
          <Text className="text-base font-black" style={{ color: colors.ink }}>
            Friends Quest
          </Text>
        </View>

        <View
          className="rounded-full px-2.5 py-0.5"
          style={{ backgroundColor: "#e0f2fe" }}
        >
          <Text
            className="text-[11px] font-extrabold"
            style={{ color: "#0369a1" }}
          >
            {friendsQuest.daysLeft} days left
          </Text>
        </View>
      </View>

      {/* Goal Title & Avatars */}
      <View className="mt-3 flex-row items-center">
        {/* Two Overlapping Avatars */}
        <View className="relative h-12 w-16">
          <View
            className="absolute left-0 top-0 h-10 w-10 items-center justify-center rounded-full border-2 border-white"
            style={{ backgroundColor: "#ff86d0" }}
          >
            <Text className="text-sm font-black text-white">S</Text>
          </View>
          <View
            className="absolute left-6 top-1 h-10 w-10 items-center justify-center rounded-full border-2 border-white"
            style={{ backgroundColor: colors.primary }}
          >
            <Text className="text-[10px] font-black uppercase text-white">
              YOU
            </Text>
          </View>
        </View>

        <View className="ml-2 flex-1">
          <Text
            className="text-sm font-black leading-tight"
            style={{ color: colors.ink }}
          >
            {friendsQuest.title}
          </Text>
          <Text className="mt-0.5 text-xs font-bold text-gray-500">
            Quest partner: {friendsQuest.partnerName}
          </Text>
        </View>
      </View>

      {/* Dual Split Progress Bar */}
      <View className="mt-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-xs font-extrabold text-gray-600">
            Sofia: {friendsQuest.partnerProgress} • You: {friendsQuest.userProgress}
          </Text>
          <Text className="text-xs font-black" style={{ color: colors.gemDark }}>
            {totalProgress} / {friendsQuest.goal}
          </Text>
        </View>

        <View
          className="mt-1.5 h-3 w-full flex-row rounded-full overflow-hidden"
          style={{ backgroundColor: "#f0efef" }}
        >
          {/* Sofia's progress */}
          <View
            className="h-full"
            style={{
              width: `${partnerPct}%`,
              backgroundColor: colors.gem,
            }}
          />
          {/* User's progress */}
          <View
            className="h-full"
            style={{
              width: `${userPct}%`,
              backgroundColor: colors.primary,
            }}
          />
        </View>
      </View>

      {/* Reward & Tactile Nudge Button */}
      <View className="mt-4 flex-row items-center justify-between border-t pt-3" style={{ borderColor: colors.border }}>
        <View className="flex-row items-center gap-2">
          <View
            className="h-9 w-9 items-center justify-center rounded-xl"
            style={{ backgroundColor: "#fff7d6" }}
          >
            <Ionicons name="gift" size={18} color={colors.goldDark} />
          </View>
          <View>
            <Text className="text-[10px] font-black uppercase text-gray-400">
              REWARD
            </Text>
            <Text className="text-xs font-extrabold" style={{ color: colors.ink }}>
              {friendsQuest.rewardTitle}
            </Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={nudged ? "Nudged Sofia" : "Nudge Sofia"}
          onPress={handleNudge}
          className="rounded-xl border-2 border-b-4 px-3.5 py-2 active:translate-y-1 active:border-b-2"
          style={{
            backgroundColor: nudged ? "#e8fadc" : "#f0efef",
            borderColor: nudged ? colors.primary : "#d1d5db",
            borderBottomColor: nudged ? colors.primaryDark : "#9ca3af",
          }}
        >
          <Text
            className="text-xs font-black"
            style={{ color: nudged ? colors.primaryDark : colors.tertiary }}
          >
            {nudged ? "Nudged ✨" : "Nudge Sofia"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

/**
 * Past Badges 2x2 Grid Section
 */
function PastBadgesGrid({
  badges,
  onBadgePress,
}: {
  badges: PastBadge[];
  onBadgePress: (badge: PastBadge) => void;
}) {
  return (
    <View className="mb-6">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-black" style={{ color: colors.ink }}>
          Past Badges
        </Text>
        <Text className="text-xs font-extrabold text-gray-500">
          {mockPastBadgesEarnedCount} Earned
        </Text>
      </View>

      {/* 2x2 Grid */}
      <View className="flex-row flex-wrap justify-between gap-y-3">
        {badges.map((badge) => (
          <Pressable
            key={badge.id}
            accessibilityRole="button"
            accessibilityLabel={`${badge.month} badge: ${badge.title}`}
            onPress={() => onBadgePress(badge)}
            className="w-[48%] items-center justify-center rounded-2xl border-2 border-b-4 p-4 active:translate-y-0.5 active:border-b-2"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderBottomColor: "#cecece",
            }}
          >
            {/* Emblem Circle */}
            <View
              className="h-16 w-16 items-center justify-center rounded-full border-2"
              style={{
                backgroundColor: badge.badgeBgColor,
                borderColor: badge.unlocked ? badge.iconColor : "#d1d5db",
              }}
            >
              <Ionicons
                name={badge.iconName}
                size={28}
                color={badge.iconColor}
              />
            </View>

            <Text
              className="mt-2.5 text-sm font-black"
              style={{ color: colors.ink }}
            >
              {badge.month}
            </Text>
            <Text
              className="mt-0.5 text-center text-xs font-bold text-gray-500"
              numberOfLines={1}
            >
              {badge.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

/**
 * Main Quests Screen
 * Displays Monthly Badge Challenge, Daily Quests with tactile Claim buttons,
 * Friends Quest with split progress, and Past Badges grid.
 */
export default function QuestsScreen() {
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>(mockDailyQuests);
  const addGems = useAppStore((state) => state.addGems);

  const handleClaimQuest = useCallback(
    (questId: string) => {
      setDailyQuests((prev) =>
        prev.map((q) => (q.id === questId ? { ...q, claimed: true } : q))
      );
      addGems(50);
      showGuardedAlert(
        `claim-${questId}`,
        "Reward Claimed! 🎉",
        "You earned 50 Gems for completing your daily quest!"
      );
    },
    [addGems]
  );

  const handleBadgePress = useCallback((badge: PastBadge) => {
    if (!badge.unlocked) {
      showGuardedAlert(
        `badge-${badge.id}`,
        `${badge.month} Badge 🔒`,
        "This badge will unlock when next month's challenge begins!"
      );
      return;
    }

    showGuardedAlert(
      `badge-${badge.id}`,
      `${badge.month}: ${badge.title} 🏆`,
      `You completed all required quests in ${badge.month} to earn this badge!`
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

      {/* Main Quests ScrollView */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Monthly Badge Challenge Hero Card */}
        <MonthlyChallengeCard />

        {/* 2. Daily Quests Section */}
        <View className="mb-5">
          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center gap-1.5">
              <Ionicons
                name="calendar-outline"
                size={18}
                color={colors.primaryDark}
              />
              <Text className="text-lg font-black" style={{ color: colors.ink }}>
                Daily Quests
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="time-outline" size={13} color="#78716c" />
              <Text className="text-xs font-bold text-gray-500">
                Resets in 7h 25m
              </Text>
            </View>
          </View>

          {/* Daily Quest Cards */}
          {dailyQuests.map((quest) => (
            <DailyQuestCard
              key={quest.id}
              quest={quest}
              onClaim={handleClaimQuest}
            />
          ))}
        </View>

        {/* 3. Friends Quest Section Card */}
        <FriendsQuestCard />

        {/* 4. Past Badges 2x2 Grid */}
        <PastBadgesGrid
          badges={mockPastBadges}
          onBadgePress={handleBadgePress}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
