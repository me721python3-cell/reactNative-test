import { useCallback, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { MobileHeader } from "@/components/MobileHeader";
import { images } from "@/constants/images";
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
 * Top Monthly Badge Hero Card
 * Precisely matched to the Stitch reference: soft sky background (#f0f8ff),
 * double-ring cosmic mascot badge, rewards pills, and stepped progress bar.
 */
function MonthlyChallengeCard() {
  const challenge = mockMonthlyChallenge;

  return (
    <View
      className="mb-5 w-full rounded-3xl p-4 shadow-sm"
      style={{
        backgroundColor: "#f0f8ff",
        borderWidth: 1,
        borderColor: "#e0f2fe",
      }}
    >
      {/* Top Tag Pills */}
      <View className="flex-row items-center justify-between">
        <View
          className="rounded-full px-3 py-1"
          style={{ backgroundColor: "#dbeafe" }}
        >
          <Text
            className="text-[11px] font-black uppercase tracking-wider"
            style={{ color: "#0284c7" }}
          >
            • {challenge.month} Challenge
          </Text>
        </View>

        <View
          className="flex-row items-center gap-1 rounded-full px-3 py-1"
          style={{ backgroundColor: "#fef3c7" }}
        >
          <Ionicons name="time-outline" size={13} color="#854d0e" />
          <Text
            className="text-[11px] font-black"
            style={{ color: "#854d0e" }}
          >
            {challenge.daysLeft} days left
          </Text>
        </View>
      </View>

      {/* Hero Visual + Title Row */}
      <View className="mt-3.5 flex-row items-center gap-3.5">
        {/* Double-ring Cosmic Mascot Badge */}
        <View className="relative items-center justify-center">
          <View
            className="items-center justify-center rounded-full"
            style={{
              width: 78,
              height: 78,
              backgroundColor: "#bae6fd",
            }}
          >
            <View
              className="items-center justify-center rounded-full"
              style={{
                width: 66,
                height: 66,
                backgroundColor: "#0284c7",
              }}
            >
              <Image
                source={images.mascotVoyager}
                style={{ width: 48, height: 48, borderRadius: 24 }}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Attached Gold Star Badge */}
          <View
            className="absolute -bottom-1 -right-1 items-center justify-center rounded-full"
            style={{
              width: 22,
              height: 22,
              backgroundColor: "#facc15",
              borderWidth: 2,
              borderColor: "#ca8a04",
            }}
          >
            <Ionicons name="star" size={11} color="#1f2937" />
          </View>
        </View>

        {/* Title, Subtitle & Rewards Summary */}
        <View className="min-w-0 flex-1">
          <Text
            className="text-lg font-black leading-tight"
            style={{ color: "#111827" }}
          >
            {challenge.title}
          </Text>
          <Text
            className="mt-1 text-xs font-semibold leading-snug"
            style={{ color: "#4b5563" }}
            numberOfLines={2}
          >
            {challenge.subtitle}
          </Text>

          {/* Mini Reward Pills */}
          <View className="mt-2 flex-row flex-wrap items-center gap-2">
            <View
              className="flex-row items-center gap-1 rounded-full px-2.5 py-0.5"
              style={{ backgroundColor: "#f3f4f6" }}
            >
              <Text
                className="text-xs font-black"
                style={{ color: "#111827" }}
              >
                {challenge.rewards.gems}
              </Text>
            </View>

            <View
              className="flex-row items-center gap-1 rounded-full px-2.5 py-0.5"
              style={{ backgroundColor: "#f3f4f6" }}
            >
              <Ionicons name="flash" size={12} color="#ca8a04" />
              <Text
                className="text-xs font-black"
                style={{ color: "#111827" }}
              >
                {challenge.rewards.boost}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Stepped Milestone Tracker Track */}
      <View className="mt-3 flex-col gap-1.5">
        <View className="flex-row items-center justify-between">
          <Text
            className="text-xs font-black"
            style={{ color: "#374151" }}
          >
            Quest Progress
          </Text>
          <Text
            className="text-xs font-black"
            style={{ color: "#58cc02" }}
          >
            {challenge.progress} / {challenge.goal} completed
          </Text>
        </View>

        {/* Progress Bar with Milestones */}
        <View
          className="relative w-full flex-row items-center overflow-visible rounded-full"
          style={{ height: 16, backgroundColor: "#e5e7eb" }}
        >
          {/* Active Green Fill (80% for 24/30) */}
          <View
            className="relative h-full rounded-full"
            style={{
              width: "80%",
              backgroundColor: "#58cc02",
            }}
          />

          {/* Milestone 1 (10) at 33% */}
          <View
            style={{
              position: "absolute",
              left: "33%",
              marginLeft: -9,
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: "#58cc02",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1.5,
              borderColor: "#ffffff",
            }}
          >
            <Ionicons name="checkmark" size={11} color="#ffffff" />
          </View>

          {/* Milestone 2 (20) at 66% */}
          <View
            style={{
              position: "absolute",
              left: "66%",
              marginLeft: -9,
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: "#58cc02",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1.5,
              borderColor: "#ffffff",
            }}
          >
            <Ionicons name="checkmark" size={11} color="#ffffff" />
          </View>

          {/* Milestone 3 (30 - Goal) at Right Edge */}
          <View
            style={{
              position: "absolute",
              right: -3,
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: "#eab308",
              borderWidth: 1.5,
              borderColor: "#ca8a04",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="lock-closed" size={12} color="#ffffff" />
          </View>
        </View>

        {/* Milestone labels */}
        <View className="mt-0.5 flex-row justify-between px-1">
          <Text
            className="text-[11px] font-extrabold"
            style={{ color: "#4b5563" }}
          >
            Start
          </Text>
          <Text
            className="pl-5 text-[11px] font-extrabold"
            style={{ color: "#4b5563" }}
          >
            10
          </Text>
          <Text
            className="pl-8 text-[11px] font-extrabold"
            style={{ color: "#4b5563" }}
          >
            20
          </Text>
          <Text
            className="text-[11px] font-black"
            style={{ color: "#ca8a04" }}
          >
            30 Quests
          </Text>
        </View>
      </View>
    </View>
  );
}

/**
 * Individual Daily Quest Card matching Stitch reference.
 * Clean white background (#ffffff), fully rounded circular icon badges,
 * and solid 3D tactile Claim button.
 */
function DailyQuestCard({
  quest,
  onClaim,
}: {
  quest: DailyQuest;
  onClaim: (id: string) => void;
}) {
  const isClaimable = quest.progress >= quest.goal && !quest.claimed;
  const isClaimed = Boolean(quest.claimed);
  const progressPercent = Math.min(
    100,
    Math.round((quest.progress / quest.goal) * 100)
  );

  return (
    <View
      className="mb-3 w-full flex-row items-center gap-3.5 rounded-2xl p-4 shadow-sm"
      style={{
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#f3f4f6",
      }}
    >
      {/* Fully Rounded Circular Icon Badge */}
      <View
        className="flex-shrink-0 items-center justify-center rounded-full"
        style={{
          width: 48,
          height: 48,
          backgroundColor:
            quest.id === "q1"
              ? "#dcfce7"
              : quest.id === "q2"
              ? "#fef9c3"
              : "#e0f2fe",
        }}
      >
        <Ionicons
          name={quest.iconName}
          size={24}
          color={
            quest.id === "q1"
              ? "#16a34a"
              : quest.id === "q2"
              ? "#ca8a04"
              : "#0284c7"
          }
        />
      </View>

      {/* Info & Status */}
      <View className="min-w-0 flex-1">
        <View className="flex-row items-center justify-between">
          <Text
            className="text-base font-black"
            style={{ color: "#111827" }}
            numberOfLines={1}
          >
            {quest.title}
          </Text>
          <Text
            className="text-xs font-black"
            style={{ color: "#374151" }}
          >
            {quest.progress} / {quest.goal}
          </Text>
        </View>

        {/* Progress Bar (12px height) */}
        <View
          className="mt-2 w-full overflow-hidden rounded-full"
          style={{ height: 12, backgroundColor: "#e5e7eb" }}
        >
          <View
            className="h-full rounded-full"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: isClaimed
                ? "#9ca3af"
                : quest.id === "q1"
                ? "#58cc02"
                : quest.id === "q2"
                ? "#eab308"
                : "#38bdf8",
            }}
          />
        </View>
      </View>

      {/* Action / Preview Box */}
      {isClaimable ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Claim reward for ${quest.title}`}
          onPress={() => onClaim(quest.id)}
          className="flex-shrink-0 rounded-2xl border-b-4 px-6 py-2.5 active:translate-y-1 active:border-b-0"
          style={{
            backgroundColor: "#58cc02",
            borderBottomColor: "#46a302",
          }}
        >
          <Text className="text-sm font-black text-white">Claim</Text>
        </Pressable>
      ) : isClaimed ? (
        <View
          className="flex-shrink-0 flex-row items-center gap-1 rounded-2xl px-3 py-2"
          style={{ backgroundColor: "#f3f4f6" }}
        >
          <Ionicons name="checkmark-done" size={14} color="#58cc02" />
          <Text
            className="text-xs font-black"
            style={{ color: "#4b5563" }}
          >
            Claimed
          </Text>
        </View>
      ) : (
        <View
          className="flex-shrink-0 items-center justify-center rounded-2xl"
          style={{
            width: 46,
            height: 46,
            backgroundColor: "#f3f4f6",
          }}
        >
          {quest.rewardType === "boost" ? (
            <View className="items-center">
              <Ionicons name="time-outline" size={16} color="#4b5563" />
              <Text
                className="text-[10px] font-black leading-tight"
                style={{ color: "#4b5563" }}
              >
                15m 2x
              </Text>
            </View>
          ) : (
            <Text
              className="text-xs font-black"
              style={{ color: "#4b5563" }}
            >
              +20
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

/**
 * Friends Quest Co-op Section Card matching Stitch reference.
 * Pure white card, partner avatar, dual-color split progress bar,
 * and tactile 3D Nudge Sofia button.
 */
function FriendsQuestCard() {
  const friendsQuest = mockFriendsQuest;
  const [nudged, setNudged] = useState(false);

  const totalProgress = friendsQuest.partnerProgress + friendsQuest.userProgress;

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
      className="mb-5 w-full rounded-3xl p-4 shadow-sm"
      style={{
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#f3f4f6",
      }}
    >
      {/* Header with Partner Info */}
      <View className="mb-2.5 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Ionicons name="people" size={18} color="#0284c7" />
          <Text
            className="text-base font-black"
            style={{ color: "#111827" }}
          >
            Friends Quest
          </Text>
        </View>
        <View
          className="rounded-full px-2.5 py-0.5"
          style={{ backgroundColor: "#e0f2fe" }}
        >
          <Text
            className="text-xs font-black"
            style={{ color: "#0284c7" }}
          >
            {friendsQuest.daysLeft} days left
          </Text>
        </View>
      </View>

      {/* Co-op Avatars & Goal Details */}
      <View className="mt-1 flex-row items-center gap-3">
        {/* Overlapping Co-op Avatars */}
        <View className="flex-shrink-0 flex-row items-center">
          <Image
            source={images.avatarSofia}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 2,
              borderColor: "#ffffff",
              backgroundColor: "#f3f4f6",
            }}
          />
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              marginLeft: -12,
              borderWidth: 2,
              borderColor: "#ffffff",
              backgroundColor: "#58cc02",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text className="text-xs font-black text-white">YOU</Text>
          </View>
        </View>

        {/* Quest Description & Partner */}
        <View className="min-w-0 flex-1 flex-col">
          <Text
            className="text-sm font-black leading-tight"
            style={{ color: "#111827" }}
          >
            {friendsQuest.title}
          </Text>
          <Text
            className="mt-0.5 text-xs font-semibold"
            style={{ color: "#4b5563" }}
          >
            Quest partner:{" "}
            <Text className="font-black" style={{ color: "#111827" }}>
              {friendsQuest.partnerName}
            </Text>
          </Text>
        </View>
      </View>

      {/* Co-op Split Progress Bar */}
      <View className="mt-3 flex-col gap-1.5">
        <View className="flex-row items-center justify-between">
          <Text
            className="text-xs font-black"
            style={{ color: "#374151" }}
          >
            Sofia: {friendsQuest.partnerProgress} • You: {friendsQuest.userProgress}
          </Text>
          <Text
            className="text-xs font-black"
            style={{ color: "#0284c7" }}
          >
            {totalProgress} / {friendsQuest.goal}
          </Text>
        </View>

        <View
          className="w-full flex-row overflow-hidden rounded-full"
          style={{ height: 13, backgroundColor: "#e5e7eb" }}
        >
          {/* Sofia's Share (46%) */}
          <View
            className="h-full rounded-l-full"
            style={{ width: "46%", backgroundColor: "#38bdf8" }}
          />
          {/* User's Share (34%) */}
          <View
            className="h-full"
            style={{ width: "34%", backgroundColor: "#58cc02" }}
          />
        </View>
      </View>

      {/* Action & Reward Row */}
      <View className="mt-3.5 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2.5">
          <View
            className="items-center justify-center rounded-xl"
            style={{
              width: 38,
              height: 38,
              backgroundColor: "#fef9c3",
            }}
          >
            <Ionicons name="gift" size={20} color="#ca8a04" />
          </View>
          <View className="flex-col">
            <Text
              className="text-[10px] font-black uppercase tracking-wider"
              style={{ color: "#6b7280" }}
            >
              Reward
            </Text>
            <Text
              className="text-xs font-black leading-tight"
              style={{ color: "#111827" }}
            >
              {friendsQuest.rewardTitle}
            </Text>
          </View>
        </View>

        {/* Nudge Interaction Button with Tactile 3D Bevel */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={nudged ? "Sent" : "Nudge Sofia"}
          onPress={handleNudge}
          className="rounded-2xl border border-[#e5e7eb] border-b-4 px-5 py-2.5 active:translate-y-1 active:border-b-2"
          style={{
            backgroundColor: nudged ? "#dcfce7" : "#f3f4f6",
            borderBottomColor: nudged ? "#86efac" : "#d1d5db",
          }}
        >
          <Text
            className="text-sm font-black"
            style={{ color: nudged ? "#16a34a" : "#0284c7" }}
          >
            {nudged ? "Nudged ✨" : "Nudge Sofia"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

/**
 * Past Badges 2x2 Grid Section matching Stitch reference.
 * Badges 1-3 have pure white card backgrounds with pastel circular glow emblems;
 * Badge 4 has a subtle gray locked background.
 */
function PastBadgesGrid({
  badges,
  onBadgePress,
}: {
  badges: PastBadge[];
  onBadgePress: (badge: PastBadge) => void;
}) {
  return (
    <View className="mb-6 flex-col gap-2.5">
      <View className="mb-1 flex-row items-center justify-between px-1">
        <Text
          className="text-lg font-black"
          style={{ color: "#111827" }}
        >
          Past Badges
        </Text>
        <Text
          className="text-xs font-black"
          style={{ color: "#6b7280" }}
        >
          {mockPastBadgesEarnedCount} Earned
        </Text>
      </View>

      {/* 2x2 Grid */}
      <View className="flex-row flex-wrap justify-between gap-y-3">
        {badges.map((badge) => {
          const badgeImage = badge.imageKey ? images[badge.imageKey] : null;

          return (
            <Pressable
              key={badge.id}
              accessibilityRole="button"
              accessibilityLabel={`${badge.month} badge: ${badge.title}`}
              onPress={() => onBadgePress(badge)}
              className="w-[48%] flex-col items-center rounded-3xl p-4 shadow-sm active:translate-y-0.5"
              style={{
                backgroundColor: badge.unlocked ? "#ffffff" : "#f3f4f6",
                borderWidth: 1,
                borderColor: badge.unlocked ? "#f3f4f6" : "#e5e7eb",
              }}
            >
              {/* Pastel Circular Glow Emblem */}
              <View
                className="mb-2 items-center justify-center rounded-full"
                style={{
                  width: 72,
                  height: 72,
                  backgroundColor:
                    badge.month === "September"
                      ? "#ffedd5"
                      : badge.month === "August"
                      ? "#fef08a"
                      : badge.month === "July"
                      ? "#e0f2fe"
                      : "#e5e7eb",
                }}
              >
                {badgeImage ? (
                  <Image
                    source={badgeImage}
                    style={{ width: 48, height: 48 }}
                    resizeMode="contain"
                  />
                ) : (
                  <Ionicons name="lock-closed" size={28} color="#6b7280" />
                )}
              </View>

              <Text
                className="text-sm font-black"
                style={{ color: badge.unlocked ? "#111827" : "#4b5563" }}
              >
                {badge.month}
              </Text>
              <Text
                className="mt-0.5 text-center text-xs font-semibold"
                style={{ color: "#6b7280" }}
                numberOfLines={1}
              >
                {badge.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/**
 * Main Quests Screen
 * Exactly matches Stitch reference styling, spacing, and colors.
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
      style={{ backgroundColor: "#fbf9f9" }}
      edges={["top"]}
    >
      {/* Top Mobile Header */}
      <MobileHeader />

      {/* Main Quests Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-auto w-full max-w-[480px]">
          {/* 1. Monthly Badge Challenge Hero Card */}
          <MonthlyChallengeCard />

          {/* 2. Daily Quests Section */}
          <View className="mb-4">
            <View className="mb-2.5 flex-row items-center justify-between px-1">
              <View className="flex-row items-center gap-2">
                <Ionicons name="calendar" size={19} color="#ca8a04" />
                <Text
                  className="text-lg font-black"
                  style={{ color: "#111827" }}
                >
                  Daily Quests
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Ionicons name="time-outline" size={14} color="#6b7280" />
                <Text
                  className="text-xs font-bold"
                  style={{ color: "#6b7280" }}
                >
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

          {/* 3. Friends Quest Section */}
          <FriendsQuestCard />

          {/* 4. Past Badges Section */}
          <PastBadgesGrid
            badges={mockPastBadges}
            onBadgePress={handleBadgePress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
