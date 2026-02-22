import { httpRouter } from "convex/server";
import { authComponent, createAuth } from "./auth";

const http = httpRouter();

// Register Better Auth routes with CORS enabled
// The crossDomain plugin handles OAuth state via database (not cookies)
// and uses one-time tokens for cross-domain session transfer
authComponent.registerRoutes(http, createAuth, { cors: true });

export default http;
