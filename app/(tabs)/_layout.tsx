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
    icons: { active: "shield", inactive: "shield-outline" },
  },
  quests: {
    title: "Quests",
    icons: { active: "archive", inactive: "archive-outline" },
  },
  profile: {
    title: "Profile",
    icons: { active: "person-circle", inactive: "person-circle-outline" },
  },
};

/**
 * Main navigation shell with 5 tabs: Learn, Practice, Ranks, Quests, Profile.
 * Clean, evenly-spaced bottom bar following Duolingo's aesthetic:
 * - Solid 2px top shelf border (#E5E5E5)
 * - Distinct active (solid green #58CC02) and inactive (outline #6F7B64) icons
 * - Proper vertical clearance and equal flex distribution so icons and labels never overlap
 */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#4b4b4b",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "800",
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 2,
          borderTopColor: colors.border,
          height: 66,
          paddingBottom: 8,
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: TABS.index.title,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={TABS.index.icons[focused ? "active" : "inactive"]}
              size={focused ? 26 : 24}
              color={focused ? colors.primary : "#4b4b4b"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="practice"
        options={{
          title: TABS.practice.title,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={TABS.practice.icons[focused ? "active" : "inactive"]}
              size={focused ? 26 : 24}
              color={focused ? colors.primary : "#4b4b4b"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ranks"
        options={{
          title: TABS.ranks.title,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={TABS.ranks.icons[focused ? "active" : "inactive"]}
              size={focused ? 26 : 24}
              color={focused ? colors.primary : "#4b4b4b"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="quests"
        options={{
          title: TABS.quests.title,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={TABS.quests.icons[focused ? "active" : "inactive"]}
              size={focused ? 26 : 24}
              color={focused ? colors.primary : "#4b4b4b"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: TABS.profile.title,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={TABS.profile.icons[focused ? "active" : "inactive"]}
              size={focused ? 26 : 24}
              color={focused ? colors.primary : "#4b4b4b"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
