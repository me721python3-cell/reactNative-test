import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/theme";
import WelcomeActions from "@/components/welcome/WelcomeActions";
import WelcomeCopy from "@/components/welcome/WelcomeCopy";
import WelcomeHeader from "@/components/welcome/WelcomeHeader";
import MascotWelcome from "@/components/welcome/MascotWelcome";

export default function HomeScreen() {
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.surface }}
      edges={["top", "bottom"]}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-auto w-full max-w-md">
          <WelcomeHeader />
          <MascotWelcome />
          <WelcomeCopy />
        </View>
        <WelcomeActions />
      </ScrollView>
    </SafeAreaView>
  );
}
