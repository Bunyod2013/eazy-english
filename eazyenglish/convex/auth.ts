import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth, type BetterAuthOptions } from "better-auth/minimal";
import { expo } from "@better-auth/expo";
import { components } from "./_generated/api";
import { query } from "./_generated/server";
import authConfig from "./auth.config";

// The component client has methods needed for integrating Convex with Better Auth
export const authComponent = createClient(components.betterAuth);

export const createAuth = (ctx: GenericCtx) => {
  return betterAuth({
    trustedOrigins: [
      "eazyenglish://",
      "exp://",
      "http://localhost:8081",
      "http://localhost:8082",
      "http://localhost:19006",
      "http://localhost:3000",
      "https://eazy-english.vercel.app",
      "https://app.eazy-english.uz",
    ],
    database: authComponent.adapter(ctx),
    // Enable email/password authentication
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    // Configure social providers
    socialProviders: {
      google: {
        clientId: process.env.AUTH_GOOGLE_ID!,
        clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      },
    },
    plugins: [
      // The Expo and Convex plugins are required
      expo(),
      convex({ authConfig }),
    ],
  });
};

// Example function for getting the current user
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.getAuthUser(ctx);
  },
});
