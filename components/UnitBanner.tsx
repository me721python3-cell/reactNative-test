import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface UnitBannerProps {
  title: string;
  description: string;
  themeColor: string;
  shadowColor: string;
  onPressGuidebook?: () => void;
}

/**
 * Tactile UnitBanner component rendered at the start of each course section.
 * Designed with solid bottom bevel and guide book shortcut.
 */
export function UnitBanner({
  title,
  description,
  themeColor,
  shadowColor,
  onPressGuidebook,
}: UnitBannerProps) {
  return (
    <View className="mb-6 w-full px-4">
      <View
        className="rounded-2xl border-b-4 p-5"
        style={{
          backgroundColor: themeColor,
          borderBottomColor: shadowColor,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-xl font-black uppercase tracking-wide text-white">
              {title}
            </Text>
            <Text className="mt-1 text-sm font-semibold text-white/90">
              {description}
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Guidebook"
            onPress={onPressGuidebook}
            className="h-11 w-11 items-center justify-center rounded-xl border-2 border-b-4 border-white/40 bg-white/20 active:translate-y-0.5 active:border-b-2"
          >
            <Ionicons name="book" size={22} color="#ffffff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
