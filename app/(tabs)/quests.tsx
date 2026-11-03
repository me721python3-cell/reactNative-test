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
 * Refined and scaled proportionally matching Stitch mobile screen specs.
 */
function MonthlyChallengeCard() {
  const challenge = mockMonthlyChallenge;

  return (
    <View className="relative mb-4 w-full overflow-hidden rounded-2xl border border-[#efeded] bg-white p-4 shadow-sm">
      {/* Subtle Cosmic Glow Backing */}
      <View
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full"
        style={{ backgroundColor: "#c8e6ff", opacity: 0.5 }}
      />
      <View
        className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full"
        style={{ backgroundColor: "#ffdf92", opacity: 0.35 }}
      />

      <View className="relative z-10 flex-col gap-2.5">
        {/* Top Urgency Pill & Month Tag */}
        <View className="flex-row items-center justify-between">
          <View
            className="flex-row items-center gap-1.5 rounded-full px-2.5 py-0.5"
            style={{ backgroundColor: "rgba(0, 101, 144, 0.1)" }}
          >
            <Ionicons name="rocket-outline" size={13} color="#006590" />
            <Text
              className="text-[10px] font-extrabold uppercase tracking-wider"
              style={{ color: "#006590" }}
            >
              {challenge.month} Challenge
            </Text>
          </View>

          <View
            className="flex-row items-center gap-1.5 rounded-full px-2.5 py-0.5"
            style={{ backgroundColor: "rgba(254, 199, 0, 0.2)" }}
          >
            <Ionicons name="time-outline" size={13} color="#755b00" />
            <Text
              className="text-[10px] font-extrabold"
              style={{ color: "#1b1c1c" }}
            >
              {challenge.daysLeft} days left
            </Text>
          </View>
        </View>

        {/* Hero Visual + Title Row */}
        <View className="mt-1 flex-row items-center gap-3">
          {/* 3D Glowing Cosmic Badge Graphic */}
          <View
            className="relative items-center justify-center rounded-full border-b-4"
            style={{
              width: 60,
              height: 60,
              backgroundColor: "#4abdff",
              borderBottomColor: "#006590",
            }}
          >
            <Image
              source={images.mascotVoyager}
              style={{ width: 42, height: 42, borderRadius: 21 }}
              resizeMode="contain"
            />
            <View
              className="absolute -bottom-1 -right-1 items-center justify-center rounded-full border-b-2"
              style={{
                width: 18,
                height: 18,
                backgroundColor: "#fec700",
                borderBottomColor: "#6e5400",
              }}
            >
              <Ionicons name="star" size={10} color="#1b1c1c" />
            </View>
          </View>

          {/* Title & Rewards Summary */}
          <View className="min-w-0 flex-1">
            <Text
              className="text-base font-black leading-tight"
              style={{ color: "#1b1c1c" }}
            >
              {challenge.title}
            </Text>
            <Text
              className="mt-0.5 text-xs font-semibold leading-snug"
              style={{ color: "#3f4a36" }}
              numberOfLines={2}
            >
              {challenge.subtitle}
            </Text>

            {/* Mini Reward Badges */}
            <View className="mt-1.5 flex-row flex-wrap items-center gap-1.5">
              <View
                className="flex-row items-center gap-1 rounded-md px-2 py-0.5"
                style={{ backgroundColor: "#efeded" }}
              >
                <Ionicons name="diamond" size={11} color="#4abdff" />
                <Text
                  className="text-[11px] font-black"
                  style={{ color: "#1b1c1c" }}
                >
                  {challenge.rewards.gems}
                </Text>
              </View>

              <View
                className="flex-row items-center gap-1 rounded-md px-2 py-0.5"
                style={{ backgroundColor: "#efeded" }}
              >
                <Ionicons name="flash" size={11} color="#755b00" />
                <Text
                  className="text-[11px] font-black"
                  style={{ color: "#1b1c1c" }}
                >
                  {challenge.rewards.boost}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stepped Milestone Tracker Track */}
        <View className="mt-1.5 flex-col gap-1">
          <View className="flex-row items-center justify-between">
            <Text
              className="text-[11px] font-extrabold"
              style={{ color: "#3f4a36" }}
            >
              Quest Progress
            </Text>
            <Text
              className="text-[11px] font-black"
              style={{ color: "#2b6c00" }}
            >
              {challenge.progress} / {challenge.goal} completed
            </Text>
          </View>

          {/* Chunky Sleek Progress Bar (10px height) */}
          <View
            className="relative w-full flex-row items-center overflow-visible rounded-full"
            style={{ height: 10, backgroundColor: "#e9e8e7" }}
          >
            {/* Active Fill Tube */}
            <View
              className="relative h-full overflow-hidden rounded-full"
              style={{
                width: "80%",
                backgroundColor: "#58cc02",
              }}
            >
              {/* Gloss streak */}
              <View
                className="absolute left-0 right-0 top-0 h-1 rounded-full"
                style={{ backgroundColor: "#ffffff", opacity: 0.3 }}
              />
            </View>

            {/* Milestone 1 (10) at 33% */}
            <View
              style={{
                position: "absolute",
                left: "33%",
                marginLeft: -7,
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: "#58cc02",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="checkmark" size={9} color="#ffffff" />
            </View>

            {/* Milestone 2 (20) at 66% */}
            <View
              style={{
                position: "absolute",
                left: "66%",
                marginLeft: -7,
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: "#58cc02",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="checkmark" size={9} color="#ffffff" />
            </View>

            {/* Milestone 3 (30 - Goal) at Right Edge */}
            <View
              style={{
                position: "absolute",
                right: -2,
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: "#fec700",
                borderBottomWidth: 1.5,
                borderBottomColor: "#6e5400",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="lock-closed" size={9} color="#6e5400" />
            </View>
          </View>

          {/* Milestone labels */}
          <View className="mt-1 flex-row justify-between px-1">
            <Text
              className="text-[10px] font-extrabold"
              style={{ color: "#3f4a36" }}
            >
              Start
            </Text>
            <Text
              className="pl-4 text-[10px] font-extrabold"
              style={{ color: "#3f4a36" }}
            >
              10
            </Text>
            <Text
              className="pl-8 text-[10px] font-extrabold"
              style={{ color: "#3f4a36" }}
            >
              20
            </Text>
            <Text
              className="text-[10px] font-black"
              style={{ color: "#755b00" }}
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
 * Individual Daily Quest Card with compact, crisp sizing.
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
    <View className="relative mb-2.5 w-full flex-row items-center gap-3 rounded-2xl border border-[#efeded] bg-white p-3 shadow-sm">
      {/* Icon badge */}
      <View
        className="flex-shrink-0 items-center justify-center rounded-xl"
        style={{
          width: 42,
          height: 42,
          backgroundColor: quest.iconBgColor,
        }}
      >
        <Ionicons name={quest.iconName} size={22} color={quest.iconColor} />
      </View>

      {/* Info & Status */}
      <View className="min-w-0 flex-1">
        <View className="flex-row items-center justify-between">
          <Text
            className="text-sm font-extrabold"
            style={{ color: "#1b1c1c" }}
            numberOfLines={1}
          >
            {quest.title}
          </Text>
          <Text
            className="text-xs font-black"
            style={{
              color: isClaimable ? "#2b6c00" : "#3f4a36",
            }}
          >
            {quest.progress} / {quest.goal}
          </Text>
        </View>

        {/* Progress Bar (8px height) */}
        <View
          className="mt-1.5 w-full overflow-hidden rounded-full"
          style={{ height: 8, backgroundColor: "#e9e8e7" }}
        >
          <View
            className="h-full rounded-full"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: isClaimed ? "#9ca3af" : quest.progressColor,
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
          className="flex-shrink-0 flex-row items-center gap-1 rounded-xl border-b-4 px-3 py-1.5 active:translate-y-1 active:border-b-0"
          style={{
            backgroundColor: "#58cc02",
            borderBottomColor: "#1e5000",
          }}
        >
          <Ionicons name="diamond" size={13} color="#ffffff" />
          <Text className="text-xs font-black uppercase text-white">Claim</Text>
        </Pressable>
      ) : isClaimed ? (
        <View
          className="flex-shrink-0 flex-row items-center gap-1 rounded-xl px-2.5 py-1"
          style={{ backgroundColor: "#efeded" }}
        >
          <Ionicons name="checkmark-done" size={13} color="#58cc02" />
          <Text
            className="text-xs font-extrabold"
            style={{ color: "#3f4a36" }}
          >
            Claimed!
          </Text>
        </View>
      ) : (
        <View
          className="min-w-[48px] flex-shrink-0 flex-col items-center justify-center rounded-xl px-2 py-1"
          style={{ backgroundColor: "#efeded" }}
        >
          {quest.rewardType === "boost" ? (
            <Ionicons name="time" size={16} color="#755b00" />
          ) : (
            <Ionicons name="diamond" size={16} color="#4abdff" />
          )}
          <Text
            className="mt-0.5 text-[10px] font-black leading-tight"
            style={{ color: "#3f4a36" }}
          >
            {quest.rewardLabel}
          </Text>
        </View>
      )}
    </View>
  );
}

/**
 * Friends Quest Co-op Section Card
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
    <View className="relative mb-4 w-full rounded-2xl border border-[#efeded] bg-white p-3.5 shadow-sm">
      {/* Header with Partner Info */}
      <View className="mb-2 flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="people-outline" size={16} color="#006590" />
          <Text
            className="text-sm font-black"
            style={{ color: "#1b1c1c" }}
          >
            Friends Quest
          </Text>
        </View>
        <View
          className="rounded-full px-2 py-0.5"
          style={{ backgroundColor: "rgba(74, 189, 255, 0.15)" }}
        >
          <Text
            className="text-[10px] font-extrabold"
            style={{ color: "#006590" }}
          >
            {friendsQuest.daysLeft} days left
          </Text>
        </View>
      </View>

      {/* Co-op Avatars & Goal Details */}
      <View className="mt-0.5 flex-row items-start gap-2.5">
        {/* Overlapping Co-op Avatars */}
        <View className="flex-shrink-0 flex-row items-center">
          <Image
            source={images.avatarSofia}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              borderWidth: 2,
              borderColor: "#ffffff",
              backgroundColor: "#efeded",
            }}
          />
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              marginLeft: -10,
              borderWidth: 2,
              borderColor: "#ffffff",
              backgroundColor: "#58cc02",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text className="text-[10px] font-black text-white">YOU</Text>
          </View>
        </View>

        {/* Quest Description & Progress Text */}
        <View className="min-w-0 flex-1 flex-col">
          <Text
            className="text-xs font-black leading-tight"
            style={{ color: "#1b1c1c" }}
          >
            {friendsQuest.title}
          </Text>
          <Text className="mt-0.5 text-[11px] font-semibold" style={{ color: "#3f4a36" }}>
            Quest partner:{" "}
            <Text className="font-extrabold" style={{ color: "#1b1c1c" }}>
              {friendsQuest.partnerName}
            </Text>
          </Text>
        </View>
      </View>

      {/* Co-op Progress Bar (9px height) */}
      <View className="mt-2.5 flex-col gap-1">
        <View className="flex-row items-center justify-between">
          <Text
            className="text-[11px] font-extrabold"
            style={{ color: "#3f4a36" }}
          >
            Sofia: {friendsQuest.partnerProgress} • You: {friendsQuest.userProgress}
          </Text>
          <Text
            className="text-[11px] font-black"
            style={{ color: "#006590" }}
          >
            {totalProgress} / {friendsQuest.goal}
          </Text>
        </View>

        <View
          className="w-full flex-row overflow-hidden rounded-full"
          style={{ height: 9, backgroundColor: "#e9e8e7" }}
        >
          {/* Sofia's Share (46%) */}
          <View
            className="h-full rounded-l-full"
            style={{ width: "46%", backgroundColor: "#4abdff" }}
          />
          {/* User's Share (34%) */}
          <View
            className="h-full"
            style={{ width: "34%", backgroundColor: "#58cc02" }}
          />
        </View>
      </View>

      {/* Action & Reward Row */}
      <View
        className="mt-2.5 flex-row items-center justify-between border-t pt-2"
        style={{ borderColor: "#efeded" }}
      >
        <View className="flex-row items-center gap-2">
          <View
            className="items-center justify-center rounded-lg"
            style={{
              width: 30,
              height: 30,
              backgroundColor: "rgba(254, 199, 0, 0.2)",
            }}
          >
            <Ionicons name="gift-outline" size={16} color="#755b00" />
          </View>
          <View className="flex-col">
            <Text
              className="text-[9px] font-black uppercase"
              style={{ color: "#3f4a36" }}
            >
              Reward
            </Text>
            <Text
              className="text-[11px] font-black leading-none"
              style={{ color: "#1b1c1c" }}
            >
              {friendsQuest.rewardTitle}
            </Text>
          </View>
        </View>

        {/* Nudge Interaction Button */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={nudged ? "Sent" : "Nudge Sofia"}
          onPress={handleNudge}
          className="flex-row items-center gap-1 rounded-xl border-b-[3px] px-3 py-1.5 active:translate-y-1 active:border-b-0"
          style={{
            backgroundColor: nudged ? "#58cc02" : "#efeded",
            borderBottomColor: nudged ? "#1e5000" : "#dbdad9",
          }}
        >
          <Ionicons
            name={nudged ? "checkmark" : "hand-left-outline"}
            size={14}
            color={nudged ? "#ffffff" : "#006590"}
          />
          <Text
            className="text-xs font-black"
            style={{ color: nudged ? "#ffffff" : "#006590" }}
          >
            {nudged ? "Sent!" : "Nudge Sofia"}
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
    <View className="mb-6 flex-col gap-2">
      <View className="mb-1 flex-row items-center justify-between px-1">
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="medal-outline" size={18} color="#755b00" />
          <Text
            className="text-base font-black"
            style={{ color: "#1b1c1c" }}
          >
            Past Badges
          </Text>
        </View>
        <Text
          className="text-xs font-extrabold"
          style={{ color: "#3f4a36" }}
        >
          {mockPastBadgesEarnedCount} Earned
        </Text>
      </View>

      {/* 4-Card Grid */}
      <View className="flex-row flex-wrap justify-between gap-y-2.5">
        {badges.map((badge) => {
          const badgeImage = badge.imageKey ? images[badge.imageKey] : null;

          return (
            <Pressable
              key={badge.id}
              accessibilityRole="button"
              accessibilityLabel={`${badge.month} badge: ${badge.title}`}
              onPress={() => onBadgePress(badge)}
              className="w-[48%] flex-col items-center rounded-2xl border p-3 shadow-sm active:translate-y-0.5"
              style={{
                backgroundColor: badge.unlocked ? "#ffffff" : "#efeded",
                borderColor: badge.unlocked ? "#efeded" : "#e3e2e2",
                opacity: badge.unlocked ? 1 : 0.75,
              }}
            >
              <View
                className="relative mb-1 items-center justify-center"
                style={{ width: 56, height: 56 }}
              >
                <View
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: badge.glowColor,
                    opacity: badge.unlocked ? 0.35 : 0.2,
                  }}
                />
                {badgeImage ? (
                  <Image
                    source={badgeImage}
                    style={{ width: 40, height: 40 }}
                    resizeMode="contain"
                  />
                ) : (
                  <View
                    className="items-center justify-center rounded-full"
                    style={{ width: 40, height: 40, backgroundColor: "#e9e8e7" }}
                  >
                    <Ionicons name="lock-closed" size={20} color="#6f7b64" />
                  </View>
                )}
              </View>

              <Text
                className="text-xs font-black"
                style={{ color: badge.unlocked ? "#1b1c1c" : "#3f4a36" }}
              >
                {badge.month}
              </Text>
              <Text
                className="text-center text-[11px] font-semibold"
                style={{ color: badge.unlocked ? "#3f4a36" : "#6f7b64" }}
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
          paddingTop: 14,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-auto w-full max-w-[480px]">
          {/* 1. Monthly Badge Challenge Hero Card */}
          <MonthlyChallengeCard />

          {/* 2. Daily Quests Section */}
          <View className="mb-3.5">
            <View className="mb-2 flex-row items-center justify-between px-1">
              <View className="flex-row items-center gap-1.5">
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color="#755b00"
                />
                <Text
                  className="text-base font-black"
                  style={{ color: "#1b1c1c" }}
                >
                  Daily Quests
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Ionicons name="time-outline" size={14} color="#3f4a36" />
                <Text
                  className="text-xs font-extrabold"
                  style={{ color: "#3f4a36" }}
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
