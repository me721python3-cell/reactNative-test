import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import { ChallengeCard } from "@/components/ChallengeCard";
import { DrawerStatus, FooterDrawer } from "@/components/FooterDrawer";
import { LessonHeader } from "@/components/LessonHeader";
import { colors } from "@/constants/theme";
import { getMockLessonById, getNextLessonId } from "@/data/mockChallenges";
import { useAppStore } from "@/store/useAppStore";

/**
 * Lesson Screen (Gameplay Arena).
 * Implements Stitch designs for:
 * - Glossy gummy Progress Bar & hearts header
 * - SELECT challenge with 2x2 tactile choice cards
 * - Animated sliding FooterDrawer for Success / Error feedback
 */
export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lessonId = id || "u1-l4";

  // Load specific challenge dynamically by lesson ID
  const lesson = getMockLessonById(lessonId);

  // Subscribe to live Zustand game state
  const hearts = useAppStore((state) => state.hearts);
  const decrementHeart = useAppStore((state) => state.decrementHeart);
  const refillHearts = useAppStore((state) => state.refillHearts);
  const completeLesson = useAppStore((state) => state.completeLesson);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [drawerStatus, setDrawerStatus] = useState<DrawerStatus>("none");

  const handleSelectOption = (optionId: string) => {
    if (drawerStatus === "none") {
      setSelectedOptionId(optionId);
    }
  };

  const handleCheck = () => {
    if (!selectedOptionId) return;

    // Check option state for drawer animation demo
    const selected = lesson.challenge.options.find(
      (opt) => opt.id === selectedOptionId
    );

    if (selected?.isCorrect) {
      setDrawerStatus("success");
    } else {
      decrementHeart();
      setDrawerStatus("error");
    }
  };

  const handleContinue = () => {
    const nextLessonId = getNextLessonId(lesson.id);
    completeLesson(lesson.id, nextLessonId);

    Alert.alert(
      "Lesson Complete! 🎉",
      "Great job! You earned +10 Gems 💎 and unlocked the next lesson.",
      [{ text: "CONTINUE", onPress: () => router.back() }]
    );
  };

  const handleRetry = () => {
    if (hearts <= 0) {
      Alert.alert(
        "Out of Hearts! ❤️",
        "You need hearts to continue practicing. Would you like to refill your hearts?",
        [
          { text: "Quit Lesson", style: "destructive", onPress: () => router.back() },
          {
            text: "Refill Hearts",
            onPress: () => {
              refillHearts();
              setDrawerStatus("none");
              setSelectedOptionId(null);
            },
          },
        ]
      );
      return;
    }
    setDrawerStatus("none");
    setSelectedOptionId(null);
  };

  const handleClose = () => {
    Alert.alert("Quit lesson?", "You will lose your progress for this session.", [
      { text: "STAY", style: "cancel" },
      { text: "QUIT", style: "destructive", onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.surface }}
      edges={["top"]}
    >
      {/* Header with progress bar & hearts */}
      <LessonHeader
        progressPercentage={lesson.percentage}
        hearts={hearts}
        onClose={handleClose}
      />

      {/* Main Challenge Arena */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ChallengeCard
          challenge={lesson.challenge}
          selectedOptionId={selectedOptionId}
          onSelectOption={handleSelectOption}
          status={drawerStatus}
          disabled={drawerStatus !== "none"}
        />
      </ScrollView>

      {/* Sliding Footer Feedback Drawer */}
      <FooterDrawer
        status={drawerStatus}
        disabled={!selectedOptionId}
        correctSolution={lesson.challenge.correctSolution}
        onCheck={handleCheck}
        onContinue={handleContinue}
        onRetry={handleRetry}
      />
    </SafeAreaView>
  );
}
