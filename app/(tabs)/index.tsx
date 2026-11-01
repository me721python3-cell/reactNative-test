import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { LessonNode } from "@/components/LessonNode";
import { MobileHeader } from "@/components/MobileHeader";
import { UnitBanner } from "@/components/UnitBanner";
import { colors } from "@/constants/theme";
import { Lesson, mockUnits } from "@/data/mockUnits";

/**
 * Lingua Home / Learn Screen
 * Renders the gamified learning path in an S-curve layout with interactive unit nodes.
 */
const S_CURVE_OFFSETS = [0, 50, 80, 50, 0, -50, -80, -50];

function getSCurveMargin(index: number) {
  const offset = S_CURVE_OFFSETS[index % S_CURVE_OFFSETS.length];
  if (offset > 0) {
    return { marginLeft: offset, marginRight: 0 };
  }
  if (offset < 0) {
    return { marginLeft: 0, marginRight: Math.abs(offset) };
  }
  return { marginLeft: 0, marginRight: 0 };
}

/**
 * Main Learn Screen (Dashboard) displaying course units and lessons in a
 * gamified S-curve path. Follows AGENTS.md data mocking and Stitch design rules.
 */
export default function LearnScreen() {
  const handleLessonPress = (lesson: Lesson) => {
    if (lesson.status !== "locked") {
      router.push(`/lesson/${lesson.id}`);
    }
  };

  const handleGuidebookPress = (unitTitle: string) => {
    Alert.alert("Guidebook", `View grammar rules and vocabulary for ${unitTitle}.`);
  };

  let globalLessonIndex = 0;

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
        {mockUnits.map((unit) => {
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
                  const currentIndex = globalLessonIndex;
                  globalLessonIndex += 1;

                  return (
                    <View
                      key={lesson.id}
                      style={[
                        getSCurveMargin(currentIndex),
                        {
                          marginTop: lesson.status === "active" ? 36 : 14,
                          marginBottom: 16,
                        },
                      ]}
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
