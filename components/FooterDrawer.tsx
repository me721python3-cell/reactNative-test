import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui/Button";
import { colors } from "@/constants/theme";

export type DrawerStatus = "none" | "success" | "error";

interface FooterDrawerProps {
  status: DrawerStatus;
  disabled?: boolean;
  correctSolution?: string;
  onCheck: () => void;
  onContinue: () => void;
  onRetry?: () => void;
}

/**
 * FooterDrawer component for the lesson gameplay screen.
 * - Resting: Fixed white dock with a tactile "CHECK" button.
 * - Success: Slides up with #D7FFB8 background, "Nicely done!" headline, and "CONTINUE" button.
 * - Error: Slides up with #FFDFE0 background, "Correct solution:" prompt, and "RETRY" button.
 */
export function FooterDrawer({
  status,
  disabled = false,
  correctSolution = "el gato",
  onCheck,
  onContinue,
  onRetry,
}: FooterDrawerProps) {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    if (status !== "none") {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 60,
        friction: 9,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 200,
        duration: 180,
        useNativeDriver: true,
      }).start();
    }
  }, [status, slideAnim]);

  const paddingBottom = Math.max(insets.bottom, 16);

  return (
    <View className="relative w-full">
      {/* Resting Dock (Visible when status === 'none') */}
      <View
        className="w-full border-t-2 bg-white px-5 pt-4"
        style={{
          borderTopColor: colors.border,
          paddingBottom,
        }}
      >
        <Button
          label="CHECK"
          variant="primary"
          disabled={disabled}
          onPress={onCheck}
        />
      </View>

      {/* Animated Sliding Feedback Drawer */}
      {status !== "none" && (
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor:
              status === "success" ? colors.cardCorrectBg : colors.cardErrorBg,
            borderTopWidth: 2,
            borderTopColor:
              status === "success"
                ? colors.cardCorrectBorder
                : colors.cardErrorBorder,
            paddingBottom,
          }}
          className="w-full px-5 pt-5 shadow-lg"
        >
          {/* Status Message Header */}
          <View className="mb-4 flex-row items-center gap-3">
            <Ionicons
              name={
                status === "success" ? "checkmark-circle" : "close-circle"
              }
              size={36}
              color={
                status === "success"
                  ? colors.cardCorrectBorder
                  : colors.cardErrorBorder
              }
            />

            <View className="flex-1">
              <Text
                className="text-xl font-black tracking-tight"
                style={{
                  color:
                    status === "success"
                      ? colors.cardCorrectBorder
                      : colors.cardErrorBorder,
                }}
              >
                {status === "success" ? "Nicely done!" : "Correct solution:"}
              </Text>
              {status === "error" && (
                <Text
                  className="mt-0.5 text-base font-extrabold"
                  style={{ color: colors.cardErrorBorder }}
                >
                  {correctSolution}
                </Text>
              )}
            </View>
          </View>

          {/* Action Trigger Button */}
          {status === "success" ? (
            <Button
              label="CONTINUE"
              variant="primary"
              onPress={onContinue}
            />
          ) : (
            <Button
              label="RETRY"
              variant="danger"
              onPress={onRetry ?? onContinue}
            />
          )}
        </Animated.View>
      )}
    </View>
  );
}
