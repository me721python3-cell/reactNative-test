import { Pressable, Text, View } from "react-native";
import { colors, radii, sizes } from "@/constants/theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, { bg: string; text: string; shadow: string }> = {
  primary: { bg: colors.primary, text: colors.onPrimary, shadow: colors.primaryDark },
  secondary: { bg: colors.secondaryFixed, text: colors.onSecondaryFixed, shadow: colors.onSecondaryFixedVariant },
  outline: { bg: colors.surface, text: colors.primary, shadow: colors.outlineVariant },
  danger: { bg: colors.heart, text: colors.onPrimary, shadow: colors.heartDark },
};

/**
 * Tactile 3D button per AGENTS.md: solid bottom bevel, press animation
 * (translate-y + shadow collapse). No soft drop-shadows.
 */
export function Button({ label, onPress, variant = "primary", disabled = false }: ButtonProps) {
  const style = variantStyles[variant];

  return (
    <View className="relative">
      <View
        className="absolute inset-x-0 bottom-0"
        style={{ height: sizes.button + 4, borderRadius: radii.button, backgroundColor: disabled ? colors.surfaceDim : style.shadow }}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onPress}
        className={`relative items-center justify-center active:translate-y-1 active:shadow-none`}
        style={{
          height: sizes.button,
          borderRadius: radii.button,
          backgroundColor: disabled ? colors.surfaceDim : style.bg,
          borderWidth: variant === "outline" ? 2 : 0,
          borderColor: variant === "outline" ? colors.border : "transparent",
        }}
      >
        <Text className="text-base font-extrabold tracking-wide" style={{ color: disabled ? colors.outline : style.text }}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
}
