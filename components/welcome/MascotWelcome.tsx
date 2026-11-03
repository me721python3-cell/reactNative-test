import { Image, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { images } from "@/constants/images";
import { colors } from "@/constants/theme";

/**
 * Mascot hero card for the Welcome screen.
 * Replicates the Stitch reference design:
 * - Rounded card with solid 3D bottom bevel (using nested views for Android compatibility)
 * - Transparent waving fox mascot centered on light mint background
 * - Tactile 3D yellow speech bubble badge anchored in the bottom-right corner of the card
 */
export default function MascotWelcome() {
  return (
    <View
      className="mt-4 w-full items-center justify-center rounded-[32px]"
      style={{
        backgroundColor: colors.primaryDark,
        paddingBottom: 6,
      }}
    >
      <View
        className="relative w-full items-center justify-center overflow-hidden rounded-[28px]"
        style={{
          height: 270,
          backgroundColor: "#dff5cf",
        }}
      >
        {/* Transparent Waving Mascot */}
        <Image
          source={images.mascotVoyager}
          style={{ width: 220, height: 220 }}
          resizeMode="contain"
          accessibilityLabel="Lingua mascot"
        />

        {/* 3D Yellow Speech Bubble Badge positioned at bottom-right corner of the card */}
        <View
          style={{
            position: "absolute",
            right: 14,
            bottom: 14,
            width: 48,
            height: 52,
            backgroundColor: "#b45309",
            borderRadius: 18,
            paddingBottom: 4,
          }}
        >
          <View
            className="h-full w-full items-center justify-center rounded-2xl"
            style={{
              backgroundColor: "#fed7aa",
              borderRadius: 16,
            }}
          >
            <Ionicons name="chatbubble-ellipses" size={22} color="#78350f" />
          </View>
        </View>
      </View>
    </View>
  );
}