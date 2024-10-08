import { OpenAPIHono } from "@hono/zod-openapi";

import { CharosConfig } from "@/lib/types";

export default function createRouter() {
  return new OpenAPIHono<CharosConfig>({ strict: false });
}
