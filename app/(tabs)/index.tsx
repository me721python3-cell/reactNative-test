import { useCallback, useMemo } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import HomeHeader from "@/components/home/HomeHeader";
import UnitSection from "@/components/home/UnitSection";
import type { EnrichedUnit } from "@/components/home/UnitSection";
import { colors } from "@/constants/theme";
import { mockUnits } from "@/data/mockUnits";
import type { EnrichedLesson } from "@/data/mockUnits";
import { showGuardedAlert } from "@/lib/alertGuard";
import { resolveLessonStatus, useAppStore } from "@/store/useAppStore";

/**
 * Lingua Home / Learn Screen (Dashboard)
 * Renders the gamified learning path in an S-curve layout with interactive unit nodes.
 * Follows AGENTS.md modular structure and Stitch design rules.
 */
export default function LearnScreen() {
  const completedLessonIds = useAppStore((state) => state.completedLessonIds);
  const activeLessonId = useAppStore((state) => state.activeLessonId);

  const unitsWithStatus: EnrichedUnit[] = useMemo(() => {
    return mockUnits.map((unit) => ({
      ...unit,
      lessons: unit.lessons.map((lesson, currentIndex) => ({
        ...lesson,
        status: resolveLessonStatus({
          lessonId: lesson.id,
          completedLessonIds,
          activeLessonId,
        }),
        currentIndex,
      })),
    }));
  }, [completedLessonIds, activeLessonId]);

  const handleLessonPress = useCallback((lesson: EnrichedLesson) => {
    if (lesson.status === "locked") {
      const shown = showGuardedAlert(
        "locked",
        "Lesson Locked 🔒",
        "Complete the earlier active lessons to unlock this lesson!"
      );
      if (!shown) {
        console.debug("[learn] locked alert suppressed — another guard is active");
      }
      return;
    }
    router.push(`/lesson/${lesson.id}`);
  }, []);

  const handleGuidebookPress = useCallback((unitTitle: string) => {
    showGuardedAlert(
      "guidebook",
      "Guidebook",
      `View grammar rules and vocabulary for ${unitTitle}.`
    );
  }, []);

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
      edges={["top"]}
    >
      <HomeHeader />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {unitsWithStatus.map((unit) => (
          <UnitSection
            key={unit.id}
            unit={unit}
            onLessonPress={handleLessonPress}
            onGuidebookPress={handleGuidebookPress}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
