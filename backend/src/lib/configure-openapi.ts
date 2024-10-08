import { OpenAPIHono } from "@hono/zod-openapi";

import { CharosConfig } from "@/lib/types";

import packageJSON from "../../package.json";

export default function configureOpenAPI(app: OpenAPIHono<CharosConfig>) {
  app.doc("/api/api-spec", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Charos API",
    },
  });
}
