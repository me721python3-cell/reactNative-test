import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/theme";

export default function WelcomeCopy() {
  return (
    <View className="mt-5">
      <View className="flex-row items-center gap-1.5">
        <Ionicons name="sparkles" size={13} color={colors.primary} />
        <Text
          className="text-xs font-black uppercase tracking-wider"
          style={{ color: colors.primary }}
        >
          YOUR NEXT CONVERSATION STARTS HERE
        </Text>
      </View>

      <Text
        className="mt-2 text-[32px] font-black leading-[38px]"
        style={{ color: colors.ink }}
      >
        Speak up with{"\n"}confidence.
      </Text>

      <Text
        className="mt-2 text-sm font-semibold"
        style={{ color: colors.onSurfaceVariant }}
      >
        Practice for the real moments that matter.
      </Text>
    </View>
  );
}