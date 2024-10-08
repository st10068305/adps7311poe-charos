import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";

import { CharosConfig } from "@/lib/types";

export default function configureScalar(app: OpenAPIHono<CharosConfig>) {
  app.get(
    "/api-doc",
    apiReference({
      spec: {
        url: "/api-spec",
      },
      theme: "mars",
      layout: "modern",
      defaultHttpClient: {
        targetKey: "node",
        clientKey: "fetch",
      },
    })
  );
}
