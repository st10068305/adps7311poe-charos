import { RouteConfig, RouteHandler } from "@hono/zod-openapi";
import { PinoLogger } from "hono-pino";
import { Session } from "hono-sessions";

export type CharosConfig = {
  Variables: {
    logger: PinoLogger;
    session: Session;
    session_key_rotation: boolean;
  };
};

export type CharosHandler<R extends RouteConfig> = RouteHandler<
  R,
  CharosConfig
>;
