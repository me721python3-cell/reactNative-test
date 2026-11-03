import { useCallback, useMemo } from "react";
import { router } from "expo-router";

import type { EnrichedUnit } from "@/components/tabs/home/UnitSection";
import { mockUnits } from "@/data/mockUnits";
import type { EnrichedLesson } from "@/data/mockUnits";
import { showGuardedAlert } from "@/lib/alertGuard";
import { resolveLessonStatus, useAppStore } from "@/store/useAppStore";

export interface UseLearningPathReturn {
  units: EnrichedUnit[];
  handleLessonPress: (lesson: EnrichedLesson) => void;
  handleGuidebookPress: (unitTitle: string) => void;
}

/**
 * Custom hook for the Home learning path dashboard.
 * Encapsulates Zustand subscriptions, lesson status resolution,
 * and user action handlers (locked alert guards & navigation).
 */
export function useLearningPath(): UseLearningPathReturn {
  const completedLessonIds = useAppStore((state) => state.completedLessonIds);
  const activeLessonId = useAppStore((state) => state.activeLessonId);

  const units: EnrichedUnit[] = useMemo(() => {
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

  return {
    units,
    handleLessonPress,
    handleGuidebookPress,
  };
}

export default useLearningPath;
