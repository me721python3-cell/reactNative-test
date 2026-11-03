import { router } from "expo-router";
import { View } from "react-native";

import { Button } from "@/components/ui/Button";

/**
 * Action buttons for the Welcome screen.
 * - Primary "GET STARTED" with green tactile 3D bevel
 * - Secondary "I ALREADY HAVE AN ACCOUNT" with outline tactile 3D bevel
 */
export default function WelcomeActions() {
  return (
    <View className="mx-auto w-full max-w-md gap-3 pt-6">
      <Button
        label="GET STARTED"
        onPress={() => router.push("/(tabs)")}
        variant="primary"
      />
      <Button
        label="I ALREADY HAVE AN ACCOUNT"
        onPress={() => router.push("/login")}
        variant="outline"
      />
    </View>
  );
}