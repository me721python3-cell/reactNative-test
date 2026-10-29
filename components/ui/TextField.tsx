import { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import { colors, radii, sizes } from "@/constants/theme";

interface TextFieldProps extends TextInputProps {
  label: string;
  /** When set, renders a show/hide toggle for secure text. */
  secure?: boolean;
}

/**
 * Rounded input with floating-style label and optional password reveal.
 * Height and typography follow the design tokens.
 */
export function TextField({ label, secure = false, ...inputProps }: TextFieldProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = secure;

  return (
    <View className="mb-4">
      <Text className="mb-1.5 px-1 text-[13px] font-extrabold" style={{ color: colors.onSurfaceVariant }}>
        {label}
      </Text>
      <View
        className="flex-row items-center border"
        style={{
          height: sizes.input,
          borderRadius: radii.input,
          backgroundColor: colors.field,
          borderColor: colors.outlineVariant,
        }}
      >
        <TextInput
          accessibilityLabel={label}
          className="flex-1 px-4 text-[15px]"
          style={{ color: colors.ink, height: "100%" }}
          placeholderTextColor={colors.outlineVariant}
          secureTextEntry={isPassword && !visible}
          {...inputProps}
        />
        {isPassword && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={visible ? "Hide password" : "Show password"}
            hitSlop={10}
            onPress={() => setVisible((v) => !v)}
            className="px-3"
          >
            <Text className="text-[13px] font-bold" style={{ color: colors.tertiary }}>
              {visible ? "Hide" : "Show"}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
