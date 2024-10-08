import HttpStatus from "@/lib/http-status";
import TAGS from "@/lib/tags";
import { selectUsersSchema } from "@/schemas/user";
import { createRoute } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

const checkRoute = createRoute({
  path: "/authentication/check",
  method: "get",
  tags: TAGS.AUTHENTICATION,
  responses: {
    [HttpStatus.OK]: jsonContent(
      selectUsersSchema,
      "The user object returned for a successfully logged in user."
    ),
    [HttpStatus.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("The error message response object."),
      "The error message response object"
    ),
  },
});

export type CheckRoute = typeof checkRoute;

export default checkRoute;
