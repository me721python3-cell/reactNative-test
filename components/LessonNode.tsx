import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/theme";
import type { EnrichedLesson, LessonStatus } from "@/data/mockUnits";

interface LessonNodeProps {
  lesson: EnrichedLesson;
  onPress?: (lesson: EnrichedLesson) => void;
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
    iconColor: "#4a3500",
    iconName: "checkmark",
  },
  active: {
    surface: colors.primary,
    shadow: colors.primaryDark,
    iconColor: "#1b1c1c",
    iconName: "star",
  },
  locked: {
    surface: colors.locked,
    shadow: colors.lockedDark,
    iconColor: colors.lockedIcon,
    iconName: "lock-closed",
  },
};

const NODE_SIZE = 76;
const BEVEL_HEIGHT = 8;

/**
 * Stitch-accurate LessonNode component with Tactile 3D physical bevel.
 * - Completed: Gold surface + checkmark + small star badge on the top right
 * - Active: Large light green halo aura + waving mascot + '▶ START' speech bubble + green 3D node
 * - Locked: Grey surface + dark grey bevel + lock icon
 */
export function LessonNode({
  lesson,
  onPress,
}: LessonNodeProps) {
  const theme = STATUS_THEMES[lesson.status];
  const isLocked = lesson.status === "locked";
  const isActive = lesson.status === "active";
  const isCompleted = lesson.status === "completed";

  const handlePress = () => {
    if (!isLocked && onPress) {
      onPress(lesson);
    }
  };

  return (
    <View className="items-center justify-center">
      {/* Active Aura / Halo Background */}
      {isActive && (
        <View
          style={{
            position: "absolute",
            width: 170,
            height: 170,
            borderRadius: 85,
            backgroundColor: "#ddf4cc",
            zIndex: 1,
          }}
        />
      )}

      {/* Mascot next to active lesson */}
      {isActive && (
        <View
          style={{
            position: "absolute",
            left: -80,
            zIndex: 15,
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 40 }}>🦊</Text>
        </View>
      )}

      {/* Floating '▶ START' speech bubble for active lesson */}
      {isActive && (
        <View className="absolute -top-12 z-20 items-center">
          <View
            className="flex-row items-center gap-1.5 rounded-2xl border-2 px-3.5 py-1.5 shadow-sm"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <Ionicons name="play" size={14} color={colors.primary} />
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
          zIndex: 10,
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
          className="items-center justify-center active:translate-y-2"
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
            size={isCompleted ? 36 : 30}
            color={theme.iconColor}
          />
        </Pressable>

        {/* Small top-right star badge for completed nodes */}
        {isCompleted && (
          <View
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: "#ffffff",
              borderWidth: 2,
              borderColor: colors.goldDark,
              alignItems: "center",
              justifyContent: "center",
              zIndex: 25,
            }}
          >
            <Ionicons name="star" size={11} color={colors.goldDark} />
          </View>
        )}
      </View>
    </View>
  );
}
