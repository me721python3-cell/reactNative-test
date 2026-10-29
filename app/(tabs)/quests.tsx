import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MobileHeader } from "@/components/MobileHeader";
import { colors } from "@/constants/theme";

export default function QuestsScreen() {
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
      edges={["top"]}
    >
      <MobileHeader />
      <View className="flex-1 items-center justify-center px-6">
        <Text
          className="text-3xl font-extrabold"
          style={{ color: colors.ink }}
        >
          Quests
        </Text>
      </View>
    </SafeAreaView>
  );
}
