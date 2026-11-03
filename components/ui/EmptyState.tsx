import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MobileHeader } from "@/components/MobileHeader";
import { colors } from "@/constants/theme";

interface EmptyStateProps {
  title: string;
  action?: ReactNode;
  showHeader?: boolean;
}

export function EmptyState({ title, action, showHeader = true }: EmptyStateProps) {
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
      edges={["top"]}
    >
      {showHeader ? <MobileHeader /> : null}
      <View className="flex-1 items-center justify-center px-6 gap-6">
        <Text className="text-center text-3xl font-extrabold" style={{ color: colors.ink }}>
          {title}
        </Text>
        {action != null ? (
          <View className="w-full max-w-xs">{action}</View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
