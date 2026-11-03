import { View } from "react-native";

import { UnitBanner } from "@/components/UnitBanner";
import { LessonPath } from "./LessonPath";
import type { EnrichedLesson, Unit } from "@/data/mockUnits";

export type EnrichedUnit = Omit<Unit, "lessons"> & {
  lessons: EnrichedLesson[];
};

export interface UnitSectionProps {
  unit: EnrichedUnit;
  onLessonPress?: (lesson: EnrichedLesson) => void;
  onGuidebookPress?: (unitTitle: string) => void;
}

/**
 * UnitSection renders an entire unit on the Home learning path,
 * consisting of the tactile UnitBanner and the S-curve LessonPath.
 */
export function UnitSection({
  unit,
  onLessonPress,
  onGuidebookPress,
}: UnitSectionProps) {
  return (
    <View className="mb-4">
      {/* Unit Header Banner */}
      <UnitBanner
        title={unit.title}
        description={unit.description}
        themeColor={unit.themeColor}
        shadowColor={unit.shadowColor}
        onPressGuidebook={
          onGuidebookPress ? () => onGuidebookPress(unit.title) : undefined
        }
      />

      {/* S-curve path of lesson nodes */}
      <LessonPath lessons={unit.lessons} onLessonPress={onLessonPress} />
    </View>
  );
}

export default UnitSection;
