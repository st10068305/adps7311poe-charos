import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";

import createRouter from "@/lib/create-router";
import { pinoLogger } from "@/middleware/pino-logger";

import env from "@/lib/env";
import { rateLimiter } from "hono-rate-limiter";
import { CookieStore, sessionMiddleware } from "hono-sessions";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { secureHeaders } from "hono/secure-headers";

export default function createApp() {
  const app = createRouter();
  /**
   * Setup our not found and error middleware to return JSON responses.
   */
  app.notFound(notFound);
  app.onError(onError);

  /**
   * Setup our usages.
   */
  app.use(serveEmojiFavicon("📦"));
  app.use(pinoLogger());

  app.use(secureHeaders());
  app.use(
    cors({
      origin: ["http://localhost:5173", "https://charos.vps1.lone-wolf.dev"],
    })
  );
  app.use(
    csrf({
      origin: ["http://localhost:5173", "https://charos.vps1.lone-wolf.dev"],
    })
  );

  const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    // store: ... , // Redis, MemoryStore, etc. See below.
    keyGenerator: () => crypto.randomUUID(),
  });

  app.use(limiter);

  const store = new CookieStore();

  app.use(
    "*",
    sessionMiddleware({
      store,
      encryptionKey: env.SESSION_SECRET,
      expireAfterSeconds: 60 * 30, // 30 Minutes
      cookieOptions: {
        sameSite: "Strict",
        path: "/",
        httpOnly: true,
      },
    })
  );

  return app;
}
