import { Pressable, Text, View } from "react-native";
import { radii, sizes } from "@/constants/theme";
import type { SocialProvider } from "@/data/mockSocialProviders";

interface SocialButtonProps {
  provider: SocialProvider;
  onPress: () => void;
}

/** Tactile social auth button matching the primary Button bevel style. */
export function SocialButton({ provider, onPress }: SocialButtonProps) {
  return (
    <View className="relative mb-3">
      <View
        className="absolute inset-x-0 bottom-0"
        style={{ height: sizes.button, borderRadius: radii.button, backgroundColor: colors.surfaceDimShadow }}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={provider.label}
        onPress={onPress}
        className="relative flex-row items-center justify-center active:translate-y-1"
        style={{ height: sizes.button, borderRadius: radii.button, backgroundColor: provider.bg }}
      >
        <View className="w-7 items-center">
          {provider.monogram ? (
            <Text className="text-[20px] font-black" style={{ color: provider.textColor }}>
              {provider.monogram}
            </Text>
          ) : (
            <View className="h-4 w-4 rounded-sm" style={{ backgroundColor: provider.textColor }} />
          )}
        </View>
        <Text className="flex-1 text-center text-[15px] font-extrabold" style={{ color: provider.textColor }}>
          {provider.label}
        </Text>
        <View className="w-7" />
      </Pressable>
    </View>
  );
}

// Local re-export to avoid importing the whole theme in every consumer.
const colors = { surfaceDimShadow: "#d5d4d3" };
