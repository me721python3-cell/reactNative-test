import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MobileHeader } from "@/components/MobileHeader";
import UnitSection from "@/components/tabs/home/UnitSection";
import { colors } from "@/constants/theme";
import { useLearningPath } from "@/hooks/useLearningPath";

/**
 * Lingua Home / Learn Screen (Dashboard)
 * Pure orchestrator screen following AGENTS.md architecture:
 * delegates state & action handling to useLearningPath hook.
 */
export default function LearnScreen() {
  const { units, handleLessonPress, handleGuidebookPress } = useLearningPath();

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
      edges={["top"]}
    >
      <MobileHeader />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {units.map((unit) => (
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
