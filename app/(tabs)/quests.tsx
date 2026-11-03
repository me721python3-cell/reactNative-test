import { useCallback, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { MobileHeader } from "@/components/MobileHeader";
import { images } from "@/constants/images";
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
 * Top Monthly Badge Hero Card
 * Pixel-perfect alignment, positions, font sizes, and milestone placements
 * directly matching the user's reference screenshot (media_1793704263737.png).
 * The star badge is anchored to the outer bottom-right rim so it never obscures the fox mascot.
 */
function MonthlyChallengeCard() {
  const challenge = mockMonthlyChallenge;

  return (
    <View
      className="relative mb-5 w-full overflow-hidden rounded-3xl p-5 shadow-sm"
      style={{
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      {/* Subtle Ambient Cosmic Background Glows */}
      <View
        className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full"
        style={{ backgroundColor: "#e0f2fe", opacity: 0.7 }}
      />
      <View
        className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full"
        style={{ backgroundColor: "#fef3c7", opacity: 0.6 }}
      />

      <View className="relative z-10 flex-col">
        {/* 1. Top Urgency Pill & Month Tag Row */}
        <View className="flex-row items-center justify-between">
          <View
            className="flex-row items-center gap-1 rounded-full px-3.5 py-1.5"
            style={{ backgroundColor: "#e0f2fe" }}
          >
            <Text
              className="text-xs font-black uppercase tracking-wider"
              style={{ color: colors.tertiary }}
            >
              • {challenge.month} Challenge
            </Text>
          </View>

          <View
            className="flex-row items-center gap-1.5 rounded-full px-3.5 py-1.5"
            style={{ backgroundColor: "#fef3c7" }}
          >
            <Ionicons name="time-outline" size={14} color="#755b00" />
            <Text
              className="text-xs font-extrabold"
              style={{ color: colors.ink }}
            >
              {challenge.daysLeft} days left
            </Text>
          </View>
        </View>

        {/* 2. Mascot Disc + Title Row */}
        <View className="mt-4 flex-row items-center gap-4">
          {/* 3D Cosmic Mascot Badge Graphic */}
          <View
            className="relative flex-shrink-0 items-center justify-center rounded-full"
            style={{
              width: 94,
              height: 94,
              backgroundColor: "rgba(186, 230, 253, 0.4)",
            }}
          >
            {/* Inner Tactile 3D Disc */}
            <View
              className="items-center justify-center rounded-full border-b-[5px]"
              style={{
                width: 82,
                height: 82,
                backgroundColor: "#38bdf8",
                borderBottomColor: colors.tertiary,
              }}
            >
              {/* Fox mascot: centered with padding so star never overlaps */}
              <Image
                source={images.mascotVoyager}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginBottom: 2,
                  marginRight: 2,
                }}
                resizeMode="contain"
              />
            </View>

            {/* Attached Solid 3D Gold Star Badge at outer bottom-right */}
            <View
              style={{
                position: "absolute",
                bottom: 2,
                right: 2,
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: colors.gold,
                borderWidth: 2,
                borderColor: "#ffffff",
                borderBottomWidth: 3,
                borderBottomColor: colors.goldDark,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="star" size={11} color={colors.ink} />
            </View>
          </View>

          {/* Title & Rewards */}
          <View className="min-w-0 flex-1">
            <Text
              className="text-[23px] font-black leading-[27px]"
              style={{ color: colors.ink }}
            >
              Cosmic Voyager{"\n"}Badge
            </Text>
            <Text
              className="mt-1 text-[13px] font-semibold leading-[18px]"
              style={{ color: colors.onSurfaceVariant }}
              numberOfLines={2}
            >
              {challenge.subtitle}
            </Text>

            {/* Mini Reward Pills */}
            <View className="mt-3 flex-row items-center gap-2">
              <View
                className="rounded-xl px-3.5 py-1"
                style={{ backgroundColor: colors.field }}
              >
                <Text
                  className="text-xs font-black"
                  style={{ color: colors.ink }}
                >
                  {challenge.rewards.gems}
                </Text>
              </View>

              <View
                className="flex-row items-center gap-1.5 rounded-xl px-3.5 py-1"
                style={{ backgroundColor: colors.field }}
              >
                <Ionicons name="flash" size={13} color="#755b00" />
                <Text
                  className="text-xs font-black"
                  style={{ color: colors.ink }}
                >
                  {challenge.rewards.boost}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 3. Quest Progress Section */}
        <View className="mt-5 flex-col">
          <View className="flex-row items-center justify-between">
            <Text
              className="text-[14px] font-black"
              style={{ color: "#2c3327" }}
            >
              Quest Progress
            </Text>
            <Text
              className="text-[14px] font-black"
              style={{ color: colors.primary }}
            >
              {challenge.progress} / {challenge.goal} completed
            </Text>
          </View>

          {/* Chunky Milestone Progress Bar (22px height) */}
          <View
            className="relative mt-2.5 w-full flex-row items-center overflow-visible rounded-full"
            style={{ height: 22, backgroundColor: colors.field }}
          >
            {/* Active Green Fill Tube (80% for 24/30) */}
            <View
              className="relative h-full overflow-hidden rounded-full"
              style={{
                width: "80%",
                backgroundColor: colors.primary,
              }}
            >
              {/* Gloss highlight streak along top */}
              <View
                className="absolute left-1 right-1 top-0.5 rounded-full"
                style={{
                  height: 6,
                  backgroundColor: "#ffffff",
                  opacity: 0.35,
                }}
              />
            </View>

            {/* Milestone Checkpoint 1 (10) at 33% */}
            <View
              style={{
                position: "absolute",
                left: "33%",
                marginLeft: -10,
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: colors.primary,
                borderWidth: 1.5,
                borderColor: "rgba(255, 255, 255, 0.7)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="checkmark" size={12} color="#ffffff" />
            </View>

            {/* Milestone Checkpoint 2 (20) at 66% */}
            <View
              style={{
                position: "absolute",
                left: "66%",
                marginLeft: -10,
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: colors.primary,
                borderWidth: 1.5,
                borderColor: "rgba(255, 255, 255, 0.7)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="checkmark" size={12} color="#ffffff" />
            </View>

            {/* Milestone Checkpoint 3 (30 - Goal) at Right Edge */}
            <View
              style={{
                position: "absolute",
                right: -4,
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: colors.gold,
                borderWidth: 2,
                borderColor: colors.goldDark,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="lock-closed" size={14} color="#6e5400" />
            </View>
          </View>

          {/* Milestone Labels with exact alignment */}
          <View className="relative mt-1.5 h-5 w-full">
            <Text
              style={{
                position: "absolute",
                left: 2,
                fontSize: 12,
                fontWeight: "700",
                color: "#4b5563",
              }}
            >
              Start
            </Text>
            <Text
              style={{
                position: "absolute",
                left: "33%",
                marginLeft: -8,
                fontSize: 12,
                fontWeight: "700",
                color: "#4b5563",
              }}
            >
              10
            </Text>
            <Text
              style={{
                position: "absolute",
                left: "66%",
                marginLeft: -8,
                fontSize: 12,
                fontWeight: "700",
                color: "#4b5563",
              }}
            >
              20
            </Text>
            <Text
              style={{
                position: "absolute",
                right: 0,
                fontSize: 12,
                fontWeight: "900",
                color: "#755b00",
              }}
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
 * Individual Daily Quest Card matching Stitch reference.
 * Pure white card, circular icon badge, progress bar, and 3D tactile Claim button.
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
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      {/* Circular Icon Badge */}
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
              : colors.gem
          }
        />
      </View>

      {/* Info & Status */}
      <View className="min-w-0 flex-1">
        <View className="flex-row items-center justify-between">
          <Text
            className="text-base font-black"
            style={{ color: colors.ink }}
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
          style={{ height: 12, backgroundColor: colors.field }}
        >
          <View
            className="h-full rounded-full"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: isClaimed
                ? "#9ca3af"
                : quest.id === "q1"
                ? colors.primary
                : quest.id === "q2"
                ? colors.gold
                : colors.gem,
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
            backgroundColor: colors.primary,
            borderBottomColor: colors.primaryDark,
          }}
        >
          <Text className="text-sm font-black text-white">Claim</Text>
        </Pressable>
      ) : isClaimed ? (
        <View
          className="flex-shrink-0 flex-row items-center gap-1 rounded-2xl px-3.5 py-2"
          style={{ backgroundColor: colors.field }}
        >
          <Ionicons name="checkmark-done" size={14} color={colors.primary} />
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
            width: 48,
            height: 48,
            backgroundColor: colors.field,
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
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      {/* Header with Partner Info */}
      <View className="mb-2.5 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Ionicons name="people" size={18} color={colors.gem} />
          <Text
            className="text-base font-black"
            style={{ color: colors.ink }}
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
            style={{ color: colors.gem }}
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
              backgroundColor: colors.field,
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
              backgroundColor: colors.primary,
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
            style={{ color: colors.ink }}
          >
            {friendsQuest.title}
          </Text>
          <Text
            className="mt-0.5 text-xs font-semibold"
            style={{ color: colors.onSurfaceVariant }}
          >
            Quest partner:{" "}
            <Text className="font-black" style={{ color: colors.ink }}>
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
            style={{ color: colors.gem }}
          >
            {totalProgress} / {friendsQuest.goal}
          </Text>
        </View>

        <View
          className="w-full flex-row overflow-hidden rounded-full"
          style={{ height: 13, backgroundColor: colors.field }}
        >
          {/* Sofia's Share (46%) */}
          <View
            className="h-full rounded-l-full"
            style={{ width: "46%", backgroundColor: colors.gem }}
          />
          {/* User's Share (34%) */}
          <View
            className="h-full"
            style={{ width: "34%", backgroundColor: colors.primary }}
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
              style={{ color: colors.ink }}
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
            backgroundColor: nudged ? "#dcfce7" : colors.field,
            borderBottomColor: nudged ? "#86efac" : colors.surfaceDim,
          }}
        >
          <Text
            className="text-sm font-black"
            style={{ color: nudged ? "#16a34a" : colors.tertiary }}
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
          style={{ color: colors.ink }}
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
                backgroundColor: badge.unlocked ? colors.surface : colors.field,
                borderWidth: 1,
                borderColor: badge.unlocked ? colors.border : colors.surfaceDim,
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
                      : colors.surfaceDim,
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
                style={{ color: badge.unlocked ? colors.ink : "#4b5563" }}
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
                  style={{ color: colors.ink }}
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
