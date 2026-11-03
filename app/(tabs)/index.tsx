import { useCallback, useMemo } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { LessonNode } from "@/components/LessonNode";
import { MobileHeader } from "@/components/MobileHeader";
import { UnitBanner } from "@/components/UnitBanner";
import { colors } from "@/constants/theme";
import { mockUnits } from "@/data/mockUnits";
import type { EnrichedLesson } from "@/data/mockUnits";
import { showGuardedAlert } from "@/lib/alertGuard";
import { resolveLessonStatus, useAppStore } from "@/store/useAppStore";

/**
 * Lingua Home / Learn Screen
 * Renders the gamified learning path in an S-curve layout with interactive unit nodes.
 */
const S_CURVE_MARGINS = [
  { marginLeft: 0, marginRight: 0 },
  { marginLeft: 50, marginRight: 0 },
  { marginLeft: 80, marginRight: 0 },
  { marginLeft: 50, marginRight: 0 },
  { marginLeft: 0, marginRight: 0 },
  { marginLeft: 0, marginRight: 50 },
  { marginLeft: 0, marginRight: 80 },
  { marginLeft: 0, marginRight: 50 },
] as const;

const NODE_MARGIN_BOTTOM = 16;

const buildNodeStyles = (marginTop: number) =>
  S_CURVE_MARGINS.map((margin) => ({
    ...margin,
    marginBottom: NODE_MARGIN_BOTTOM,
    marginTop,
  }));

const NODE_CONTAINER_STYLES = {
  active: buildNodeStyles(36),
  inactive: buildNodeStyles(14),
};

function getNodeContainerStyle(index: number, isActive: boolean) {
  const table = isActive ? NODE_CONTAINER_STYLES.active : NODE_CONTAINER_STYLES.inactive;
  return table[index % table.length];
}

/**
 * Main Learn Screen (Dashboard) displaying course units and lessons in a
 * gamified S-curve path. Follows AGENTS.md data mocking and Stitch design rules.
 */
export default function LearnScreen() {
  const completedLessonIds = useAppStore((state) => state.completedLessonIds);
  const activeLessonId = useAppStore((state) => state.activeLessonId);

  const unitsWithStatus = useMemo(() => {
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
      {/* Top Mobile Header */}
      <MobileHeader />

      {/* Main Path ScrollView */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {unitsWithStatus.map((unit) => {
          return (
            <View key={unit.id} className="mb-4">
              {/* Unit Header Banner */}
              <UnitBanner
                title={unit.title}
                description={unit.description}
                themeColor={unit.themeColor}
                shadowColor={unit.shadowColor}
                onPressGuidebook={() => handleGuidebookPress(unit.title)}
              />

              {/* S-curve path of lesson nodes */}
              <View className="w-full items-center py-2">
                {unit.lessons.map((lesson) => {
                  const status = lesson.status;

                  return (
                    <View
                      key={lesson.id}
                      style={getNodeContainerStyle(lesson.currentIndex, status === "active")}
                    >
                      <LessonNode
                        lesson={lesson}
                        onPress={handleLessonPress}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

