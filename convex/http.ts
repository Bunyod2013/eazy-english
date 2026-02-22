import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { authComponent, createAuth } from "./auth";

const http = httpRouter();

// CORS preflight handler for all /api/auth/* routes
http.route({
  path: "/api/auth/get-session",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(request),
    });
  }),
});

http.route({
  path: "/api/auth/sign-in/social",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(request),
    });
  }),
});

http.route({
  path: "/api/auth/sign-in/email",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(request),
    });
  }),
});

http.route({
  path: "/api/auth/sign-up/email",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(request),
    });
  }),
});

http.route({
  path: "/api/auth/callback/google",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(request),
    });
  }),
});

// Register Better Auth routes
authComponent.registerRoutes(http, createAuth);

export default http;

function corsHeaders(request: Request): HeadersMap {
  const origin = request.headers.get("Origin") || "";
  const allowed = [
    "https://app.eazy-english.uz",
    "https://eazy-english.vercel.app",
    "http://localhost:3000",
    "http://localhost:8081",
  ];
  return {
    "Access-Control-Allow-Origin": allowed.includes(origin) ? origin : allowed[0],
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400",
  };
}

type HeadersMap = Record<string, string>;
