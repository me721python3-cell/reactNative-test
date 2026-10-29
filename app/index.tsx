import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/Button";
import { colors } from "@/constants/theme";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="mb-2 text-2xl font-extrabold" style={{ color: colors.ink }}>
          Welcome
        </Text>
        <Text
          className="mb-8 text-center text-[15px]"
          style={{ color: colors.onSurfaceVariant }}
        >
          Your language-learning journey starts here.
        </Text>
        <View className="w-full max-w-xs gap-3">
          <Button label="GET STARTED" onPress={() => router.push("/(tabs)")} />
          <Button
            label="I ALREADY HAVE AN ACCOUNT"
            variant="outline"
            onPress={() => router.push("/login")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
