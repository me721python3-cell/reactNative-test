import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/theme";
import { Lesson, LessonStatus } from "@/data/mockUnits";

interface LessonNodeProps {
  lesson: Lesson;
  onPress?: (lesson: Lesson) => void;
}

interface NodeTheme {
  surface: string;
  shadow: string;
  iconColor: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

const STATUS_THEMES: Record<LessonStatus, NodeTheme> = {
  completed: {
    surface: colors.gold,
    shadow: colors.goldDark,
    iconColor: "#ffffff",
    iconName: "checkmark",
  },
  active: {
    surface: colors.primary,
    shadow: colors.primaryDark,
    iconColor: "#ffffff",
    iconName: "star",
  },
  locked: {
    surface: colors.locked,
    shadow: colors.lockedDark,
    iconColor: colors.lockedIcon,
    iconName: "lock-closed",
  },
};

const NODE_SIZE = 70;
const BEVEL_HEIGHT = 8;

/**
 * Reusable Duolingo-style LessonNode component with Tactile 3D physical bevel.
 * - Completed: Gold surface + dark gold bottom bevel + checkmark
 * - Active: Green surface + dark green bottom bevel + star + "START" speech bubble
 * - Locked: Grey surface + dark grey bottom bevel + lock icon
 */
export function LessonNode({ lesson, onPress }: LessonNodeProps) {
  const theme = STATUS_THEMES[lesson.status];
  const isLocked = lesson.status === "locked";
  const isActive = lesson.status === "active";

  const handlePress = () => {
    if (!isLocked && onPress) {
      onPress(lesson);
    }
  };

  return (
    <View className="items-center justify-center">
      {/* Floating "START" speech bubble for active lesson */}
      {isActive && (
        <View className="absolute -top-11 z-20 items-center">
          <View
            className="rounded-xl border-2 px-3 py-1.5 shadow-sm"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <Text
              className="text-xs font-black tracking-wider"
              style={{ color: colors.primary }}
            >
              START
            </Text>
          </View>
          {/* Triangular speech bubble spur */}
          <View
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: 6,
              borderRightWidth: 6,
              borderTopWidth: 6,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderTopColor: colors.border,
            }}
          />
        </View>
      )}

      {/* 3D Physical Extruded Node */}
      <View
        style={{
          width: NODE_SIZE,
          height: NODE_SIZE + BEVEL_HEIGHT,
        }}
        className="relative"
      >
        {/* Solid bottom bevel shadow (does not move) */}
        <View
          style={{
            width: NODE_SIZE,
            height: NODE_SIZE,
            borderRadius: NODE_SIZE / 2,
            backgroundColor: theme.shadow,
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
        />

        {/* Pushable top surface */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${lesson.title}, ${lesson.status}`}
          accessibilityState={{ disabled: isLocked }}
          disabled={isLocked}
          onPress={handlePress}
          className={`items-center justify-center ${
            !isLocked ? "active:translate-y-2" : ""
          }`}
          style={{
            width: NODE_SIZE,
            height: NODE_SIZE,
            borderRadius: NODE_SIZE / 2,
            backgroundColor: theme.surface,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Ionicons
            name={theme.iconName}
            size={lesson.status === "completed" ? 34 : 30}
            color={theme.iconColor}
          />
        </Pressable>
      </View>
    </View>
  );
}
