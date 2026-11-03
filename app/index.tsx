import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { images } from "@/constants/images";
import { colors } from "@/constants/theme";

/**
 * Lingua Welcome / Onboarding Screen
 * Replicated exactly to match the Stitch reference image (media_1793707188695.png):
 * - Brand logo + Lingua header
 * - Light mint rounded hero card with waving mascot & bottom-right speech badge
 * - Tagline with green sparkle: "YOUR NEXT CONVERSATION STARTS HERE"
 * - Headline: "Speak up with\nconfidence."
 * - Tactile 3D "GET STARTED" and "I ALREADY HAVE AN ACCOUNT" buttons
 */
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
          {/* 1. Header: Green Logo + Lingua */}
          <View className="flex-row items-center gap-3">
            <View
              className="h-11 w-11 items-center justify-center rounded-2xl"
              style={{ backgroundColor: colors.primary }}
            >
              <Ionicons name="chatbubble" size={20} color="#ffffff" />
            </View>
            <Text
              className="text-xl font-black"
              style={{ color: colors.ink }}
            >
              Lingua
            </Text>
          </View>

          {/* 2. Hero Mascot Card */}
          <View
            className="relative mt-5 w-full items-center justify-center overflow-hidden rounded-[32px] border-b-[6px]"
            style={{
              height: 290,
              backgroundColor: "#dff5cf",
              borderBottomColor: colors.primaryDark,
            }}
          >
            {/* Mascot Character Image */}
            <Image
              source={images.mascotVoyager}
              style={{ width: 220, height: 220 }}
              resizeMode="contain"
              accessibilityLabel="Lingua mascot"
            />

            {/* Bottom-right Yellow Speech Bubble Badge */}
            <View
              className="absolute bottom-4 right-4 items-center justify-center rounded-2xl border-b-4"
              style={{
                width: 46,
                height: 46,
                backgroundColor: "#fed7aa",
                borderBottomColor: "#b45309",
              }}
            >
              <Ionicons name="chatbubble-ellipses" size={20} color="#78350f" />
            </View>
          </View>

          {/* 3. Text Section */}
          <View className="mt-5">
            {/* Tagline Pill */}
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="sparkles" size={13} color={colors.primary} />
              <Text
                className="text-xs font-black uppercase tracking-wider"
                style={{ color: colors.primary }}
              >
                YOUR NEXT CONVERSATION STARTS HERE
              </Text>
            </View>

            {/* Headline */}
            <Text
              className="mt-2 text-[32px] font-black leading-[38px]"
              style={{ color: colors.ink }}
            >
              Speak up with{"\n"}confidence.
            </Text>

            {/* Subtitle */}
            <Text
              className="mt-2 text-sm font-semibold"
              style={{ color: colors.onSurfaceVariant }}
            >
              Practice for the real moments that matter.
            </Text>
          </View>
        </View>

        {/* 4. Tactile 3D Action Buttons */}
        <View className="mx-auto w-full max-w-md gap-3 pt-6">
          {/* Primary GET STARTED Button */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Get Started"
            onPress={() => router.push("/(tabs)")}
            className="w-full items-center justify-center rounded-2xl border-b-4 py-3.5 active:translate-y-1 active:border-b-0"
            style={{
              backgroundColor: colors.primary,
              borderBottomColor: colors.primaryDark,
            }}
          >
            <Text className="text-base font-black tracking-wider text-white">
              GET STARTED
            </Text>
          </Pressable>

          {/* Secondary I ALREADY HAVE AN ACCOUNT Button */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="I already have an account"
            onPress={() => router.push("/login")}
            className="w-full items-center justify-center rounded-2xl border-2 border-b-4 py-3.5 active:translate-y-1 active:border-b-2"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderBottomColor: "#d1d5db",
            }}
          >
            <Text
              className="text-sm font-black tracking-wider"
              style={{ color: colors.primary }}
            >
              I ALREADY HAVE AN ACCOUNT
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
