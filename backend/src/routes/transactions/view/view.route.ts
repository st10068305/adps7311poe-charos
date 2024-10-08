import HttpStatus from "@/lib/http-status";
import TAGS from "@/lib/tags";
import authenticationMiddleware from "@/middleware/authentication-middleware";
import { selectTransactionsSchema } from "@/schemas/transactions";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

const viewTransactionsRoute = createRoute({
  path: "/transactions",
  method: "get",
  tags: TAGS.TRANSACTIONS,
  responses: {
    [HttpStatus.OK]: jsonContent(
      z.array(selectTransactionsSchema).default([]),
      "The transactions list."
    ),
    [HttpStatus.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("The user was not found."),
      "The not-found error message."
    ),
    [HttpStatus.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema(
        "You are not authorized to access this endpoint."
      ),
      "The un-authorized error message."
    ),
  },
  middleware: async (context, next) =>
    await authenticationMiddleware(undefined, context, next),
});

export type ViewTransactionsRoute = typeof viewTransactionsRoute;

export default viewTransactionsRoute;
