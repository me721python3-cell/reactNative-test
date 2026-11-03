import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/theme";

export default function WelcomeHeader() {
  return (
    <View className="flex-row items-center gap-3">
      <View
        className="h-11 w-11 items-center justify-center rounded-2xl"
        style={{ backgroundColor: colors.primary }}
      >
        <Ionicons name="chatbubble" size={20} color="#ffffff" />
      </View>
      <Text className="text-xl font-black" style={{ color: colors.ink }}>
        Lingua
      </Text>
    </View>
  );
}