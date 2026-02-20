import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { Platform } from "react-native";

function getPlugins() {
  const plugins: any[] = [convexClient()];

  if (Platform.OS !== "web") {
    // expoClient and SecureStore are native-only
    const { expoClient } = require("@better-auth/expo/client");
    const SecureStore = require("expo-secure-store");
    const Constants = require("expo-constants").default;
    plugins.unshift(
      expoClient({
        scheme: Constants.expoConfig?.scheme as string,
        storagePrefix: Constants.expoConfig?.scheme as string,
        storage: SecureStore,
      })
    );
  }

  return plugins;
}

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_CONVEX_SITE_URL,
  plugins: getPlugins(),
});
