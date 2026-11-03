import { View } from "react-native";

import { LessonNode } from "@/components/LessonNode";
import type { EnrichedLesson } from "@/data/mockUnits";

export interface LessonPathProps {
  lessons: EnrichedLesson[];
  onLessonPress?: (lesson: EnrichedLesson) => void;
}

/**
 * Predefined horizontal offsets for Duolingo-style S-curve layout.
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
 * LessonPath renders the S-curve sequence of LessonNode items for a unit.
 */
export function LessonPath({ lessons, onLessonPress }: LessonPathProps) {
  return (
    <View className="w-full items-center py-2">
      {lessons.map((lesson) => {
        const isActive = lesson.status === "active";

        return (
          <View
            key={lesson.id}
            style={getNodeContainerStyle(lesson.currentIndex, isActive)}
          >
            <LessonNode lesson={lesson} onPress={onLessonPress} />
          </View>
        );
      })}
    </View>
  );
}

export default LessonPath;
