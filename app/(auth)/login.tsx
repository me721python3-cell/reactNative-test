import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { SocialButton } from "@/components/ui/SocialButton";
import { colors } from "@/constants/theme";
import { mockSocialProviders } from "@/data/mockSocialProviders";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Navigate straight to tabs shell (mock login until Clerk is connected)
    router.replace("/(tabs)");
  };

  const handleSocialPress = (_provider: string) => {
    // Navigate straight to tabs shell
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }} edges={["top", "bottom"]}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="w-full max-w-[420px] self-center px-6 pb-8 pt-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Streak Saver banner */}
          <View className="mb-6 flex-row items-center gap-3 rounded-2xl p-4" style={{ backgroundColor: colors.secondaryFixed }}>
            <View className="h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: colors.primary }}>
              <Text className="text-lg">🦉</Text>
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-extrabold" style={{ color: colors.onSecondaryFixed }}>
                Streak Saver
              </Text>
              <Text className="text-[13px] leading-[18px]" style={{ color: colors.onSecondaryFixedVariant }}>
                Ready to jump back in and keep your streak alive?
              </Text>
            </View>
          </View>

          {/* Credentials */}
          <TextField
            label="Username or email"
            placeholder="e.g. lingua_fan"
            autoCapitalize="none"
            autoComplete="username"
            autoCorrect={false}
            returnKeyType="next"
            value={username}
            onChangeText={setUsername}
          />
          <TextField
            label="Password"
            placeholder="Your secret code"
            secure
            autoCapitalize="none"
            autoComplete="current-password"
            returnKeyType="done"
            onSubmitEditing={handleSignIn}
            value={password}
            onChangeText={setPassword}
          />

          <Pressable
            accessibilityRole="button"
            onPress={() => Alert.alert("Forgot password?", "Password recovery will be available once authentication is connected.")}
            className="mb-6 self-end px-1 py-1"
          >
            <Text className="text-[13px] font-extrabold" style={{ color: colors.tertiary }}>
              Forgot password?
            </Text>
          </Pressable>

          <Button label="SIGN IN" onPress={handleSignIn} />

          {/* Divider */}
          <View className="my-6 flex-row items-center gap-3">
            <View className="h-0.5 flex-1 rounded-full" style={{ backgroundColor: colors.outlineVariant }} />
            <Text className="text-[13px] font-extrabold tracking-widest" style={{ color: colors.outline }}>
              OR
            </Text>
            <View className="h-0.5 flex-1 rounded-full" style={{ backgroundColor: colors.outlineVariant }} />
          </View>

          {/* Social providers */}
          {mockSocialProviders.map((provider) => (
            <SocialButton key={provider.id} provider={provider} onPress={() => handleSocialPress(provider.id)} />
          ))}

          {/* Footer */}
          <View className="mt-6 items-center">
            <View className="flex-row items-center">
              <Text className="text-[13px]" style={{ color: colors.onSurfaceVariant }}>
                Don't have an account?
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => Alert.alert("Create a profile", "Profile creation will be available once authentication is connected.")}
                className="px-1 py-1"
              >
                <Text className="text-[13px] font-black" style={{ color: colors.primary }}>
                  CREATE A PROFILE
                </Text>
              </Pressable>
            </View>
            <Text className="mt-2 text-center text-[11px] leading-4" style={{ color: colors.outline }}>
              By signing in, you agree to our Terms and Privacy Policy.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}