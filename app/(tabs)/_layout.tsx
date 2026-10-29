import { Pressable, View } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/theme";

type TabKey = "index" | "practice" | "ranks" | "quests" | "profile";

interface TabConfig {
  title: string;
  icons: {
    active: keyof typeof Ionicons.glyphMap;
    inactive: keyof typeof Ionicons.glyphMap;
  };
}

const TABS: Record<TabKey, TabConfig> = {
  index: {
    title: "Learn",
    icons: { active: "home", inactive: "home-outline" },
  },
  practice: {
    title: "Practice",
    icons: { active: "barbell", inactive: "barbell-outline" },
  },
  ranks: {
    title: "Ranks",
    icons: { active: "trophy", inactive: "trophy-outline" },
  },
  quests: {
    title: "Quests",
    icons: { active: "medal", inactive: "medal-outline" },
  },
  profile: {
    title: "Profile",
    icons: { active: "person", inactive: "person-outline" },
  },
};

/**
 * Main navigation shell with 5 tabs: Learn, Practice, Ranks, Quests, Profile.
 * Incorporates Duolingo-style Tactile 3D aesthetic per AGENTS.md:
 * - Solid 2px top shelf
 * - Tactile active tile container with solid bottom lip
 * - Mechanical press translation feedback (active:translate-y-0.5)
 */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.outline,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "800",
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 2,
          borderTopColor: colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarButton: ({ ref, ...props }) => (
          <Pressable
            {...props}
            accessibilityRole="button"
            className="flex-1 items-center justify-center py-1 active:translate-y-0.5"
          >
            {props.children}
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: TABS.index.title,
          tabBarIcon: ({ focused }) => (
            <View
              className={`items-center justify-center rounded-xl px-2.5 py-0.5 ${
                focused
                  ? "border-2 border-b-[3px] border-[#58cc02] bg-[#58cc02]/15"
                  : "border-2 border-transparent"
              }`}
            >
              <Ionicons
                name={TABS.index.icons[focused ? "active" : "inactive"]}
                size={22}
                color={focused ? colors.primary : colors.outline}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="practice"
        options={{
          title: TABS.practice.title,
          tabBarIcon: ({ focused }) => (
            <View
              className={`items-center justify-center rounded-xl px-2.5 py-0.5 ${
                focused
                  ? "border-2 border-b-[3px] border-[#58cc02] bg-[#58cc02]/15"
                  : "border-2 border-transparent"
              }`}
            >
              <Ionicons
                name={TABS.practice.icons[focused ? "active" : "inactive"]}
                size={22}
                color={focused ? colors.primary : colors.outline}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="ranks"
        options={{
          title: TABS.ranks.title,
          tabBarIcon: ({ focused }) => (
            <View
              className={`items-center justify-center rounded-xl px-2.5 py-0.5 ${
                focused
                  ? "border-2 border-b-[3px] border-[#58cc02] bg-[#58cc02]/15"
                  : "border-2 border-transparent"
              }`}
            >
              <Ionicons
                name={TABS.ranks.icons[focused ? "active" : "inactive"]}
                size={22}
                color={focused ? colors.primary : colors.outline}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="quests"
        options={{
          title: TABS.quests.title,
          tabBarIcon: ({ focused }) => (
            <View
              className={`items-center justify-center rounded-xl px-2.5 py-0.5 ${
                focused
                  ? "border-2 border-b-[3px] border-[#58cc02] bg-[#58cc02]/15"
                  : "border-2 border-transparent"
              }`}
            >
              <Ionicons
                name={TABS.quests.icons[focused ? "active" : "inactive"]}
                size={22}
                color={focused ? colors.primary : colors.outline}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: TABS.profile.title,
          tabBarIcon: ({ focused }) => (
            <View
              className={`items-center justify-center rounded-xl px-2.5 py-0.5 ${
                focused
                  ? "border-2 border-b-[3px] border-[#58cc02] bg-[#58cc02]/15"
                  : "border-2 border-transparent"
              }`}
            >
              <Ionicons
                name={TABS.profile.icons[focused ? "active" : "inactive"]}
                size={22}
                color={focused ? colors.primary : colors.outline}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
