import HttpStatus from "@/lib/http-status";
import TAGS from "@/lib/tags";
import authenticationMiddleware from "@/middleware/authentication-middleware";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

const deleteTransactionRoute = createRoute({
  path: "/transactions",
  method: "delete",
  tags: TAGS.TRANSACTIONS,
  request: {
    query: z.object({ id: z.string().uuid() }),
  },
  responses: {
    [HttpStatus.OK]: {
      content: {
        "text/plain": {
          schema: z.string().default("ok"),
        },
      },
      description: "The ok response text.",
    },
    [HttpStatus.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("The transaction was not found."),
      "The not-found error message."
    ),
    [HttpStatus.FORBIDDEN]: jsonContent(
      createMessageObjectSchema(
        "The transaction has already been processed, you are unable to delete it."
      ),
      "The forbidden error message."
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

export type DeleteTransactionRoute = typeof deleteTransactionRoute;

export default deleteTransactionRoute;
