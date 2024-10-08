import HttpStatus from "@/lib/http-status";
import TAGS from "@/lib/tags";
import authenticationMiddleware from "@/middleware/authentication-middleware";
import {
  insertTransactionsSchema,
  selectTransactionsSchema,
} from "@/schemas/transactions";
import { createRoute } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

const createTransactionRoute = createRoute({
  path: "/transactions",
  method: "post",
  tags: TAGS.TRANSACTIONS,
  request: {
    body: jsonContent(
      insertTransactionsSchema,
      "The transaction payload to insert."
    ),
  },
  responses: {
    [HttpStatus.OK]: jsonContent(
      selectTransactionsSchema,
      "The newly created transaction object."
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

export type CreateTransactionRoute = typeof createTransactionRoute;

export default createTransactionRoute;
