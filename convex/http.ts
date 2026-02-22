import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { authComponent, createAuth } from "./auth";

const http = httpRouter();

// Direct Google OAuth redirect (avoids cross-domain cookie issues)
// Browser navigates here directly, so cookies are first-party
http.route({
  path: "/auth/google",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const callbackURL = url.searchParams.get("callbackURL") || "https://app.eazy-english.uz/";

    const auth = createAuth(ctx);
    const response = await auth.handler(
      new Request(url.origin + "/api/auth/sign-in/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: "google", callbackURL }),
      })
    );

    return response;
  }),
});

// Register Better Auth routes with CORS enabled
authComponent.registerRoutes(http, createAuth, { cors: true });

export default http;
