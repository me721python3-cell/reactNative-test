import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useShallow } from "zustand/react/shallow";

import { ChallengeCard } from "@/components/ChallengeCard";
import { FooterDrawer } from "@/components/FooterDrawer";
import type { DrawerStatus } from "@/components/FooterDrawer";
import { LessonHeader } from "@/components/LessonHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { DEFAULT_LESSON_ID } from "@/constants/progression";
import { colors } from "@/constants/theme";
import {
  getNextLessonId,
  tryGetMockLessonById,
} from "@/data/mockChallenges";
import type { MockLessonData } from "@/data/mockChallenges";
import { isGuardActive, releaseGuard, releaseGuardsForOwner, showGuardedAlert } from "@/lib/alertGuard";
import { goBackOrHome } from "@/lib/navigation";
import { useAppStore } from "@/store/useAppStore";

interface LessonArenaProps {
  lesson: MockLessonData;
}

/**
 * Main Interactive Lesson Arena with Stitch 3D styling.
 * Guaranteed to have a non-null lesson before mounting.
 */
function LessonArena({ lesson }: LessonArenaProps) {
  const ownerId = useRef(`lesson-${lesson.id}`).current;

  // Subscribe to live Zustand game state
  const { hearts, decrementHeart, refillHearts, completeLesson } = useAppStore(
    useShallow((state) => ({
      hearts: state.hearts,
      decrementHeart: state.decrementHeart,
      refillHearts: state.refillHearts,
      completeLesson: state.completeLesson,
    }))
  );

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [drawerStatus, setDrawerStatus] = useState<DrawerStatus>("none");

  useEffect(() => {
    return () => {
      releaseGuardsForOwner(ownerId);
    };
  }, [ownerId]);

  const resetTurn = () => {
    setDrawerStatus("none");
    setSelectedOptionId(null);
  };

  const handleSelectOption = (optionId: string) => {
    if (drawerStatus !== "none") return;
    setSelectedOptionId(optionId);
  };

  const promptRefillHearts = () => {
    showGuardedAlert(
      "hearts",
      "Out of Hearts! ❤️",
      "You need hearts to continue practicing. Would you like to refill your hearts?",
      [
        {
          text: "Quit Lesson",
          style: "destructive",
          onPress: () => {
            goBackOrHome();
          },
        },
        {
          text: "Refill Hearts",
          onPress: () => {
            refillHearts();
            resetTurn();
          },
        },
      ],
      undefined,
      ownerId
    );
  };

  const handleRetry = () => {
    if (hearts <= 0) {
      promptRefillHearts();
      return;
    }
    resetTurn();
  };

  const handleCheck = () => {
    if (drawerStatus !== "none") return;
    if (isGuardActive()) return;

    if (!selectedOptionId) {
      showGuardedAlert(
        "pick",
        "Pick an answer",
        "Select an option before checking.",
        [{ text: "OK" }],
        undefined,
        ownerId
      );
      return;
    }

    const options = lesson.challenge.options;
    const selected = options.find((opt) => opt.id === selectedOptionId);

    if (!selected) {
      showGuardedAlert(
        "unexpected",
        "Unexpected error",
        "Option not found. Please try again.",
        [{ text: "OK" }],
        undefined,
        ownerId
      );
      return;
    }

    if (selected.isCorrect) {
      setDrawerStatus("success");
      return;
    }

    if (hearts <= 0) {
      promptRefillHearts();
      return;
    }

    decrementHeart();
    setDrawerStatus("error");
  };

  const handleContinue = () => {
    const nextLessonId = getNextLessonId(lesson.id);
    const completionMessage = nextLessonId
      ? "Great job! You earned +10 Gems 💎 and unlocked the next lesson."
      : "Great job! You completed the final lesson! 🎉";

    showGuardedAlert(
      "continue",
      "Lesson Complete! 🎉",
      completionMessage,
      [
        {
          text: "CONTINUE",
          onPress: () => {
            try {
              completeLesson(lesson.id, nextLessonId);
              goBackOrHome();
            } catch (e) {
              console.warn("completeLesson failed", e);
              showGuardedAlert(
                "save-error",
                "Couldn't save progress",
                "Your progress could not be saved.",
                [{ text: "OK" }],
                undefined,
                ownerId
              );
            }
          },
        },
      ],
      undefined,
      ownerId
    );
  };

  const handleClose = () => {
    showGuardedAlert(
      "close",
      "Quit lesson?",
      "You will lose your progress for this session.",
      [
        { text: "STAY", style: "cancel" },
        {
          text: "QUIT",
          style: "destructive",
          onPress: () => {
            goBackOrHome();
          },
        },
      ],
      undefined,
      ownerId
    );
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

/**
 * Route Entrypoint for /lesson/[id].
 * Extracts params, resolves the lesson challenge, and guards against missing lessons first.
 */
export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const rawId = Array.isArray(id) ? id[0] : id;
  const lessonId = rawId || DEFAULT_LESSON_ID;

  const lesson = tryGetMockLessonById(lessonId);

  if (!lesson) {
    console.warn(`Lesson not found for id: ${lessonId}`);
    return (
      <EmptyState
        title="Lesson not found"
        showHeader={false}
        action={
          <Button
            label="Return to Home"
            onPress={() => goBackOrHome()}
          />
        }
      />
    );
  }

  return <LessonArena key={lesson.id} lesson={lesson} />;
}
