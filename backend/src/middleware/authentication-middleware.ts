import type { Context, Next } from "hono";

import database from "@/lib/database";
import { CharosConfig } from "@/lib/types";
import users from "@/schemas/user";
import { eq } from "drizzle-orm";

export default async function authenticationMiddleware(
  requiredRoles: Array<string> | undefined,
  context: Context<CharosConfig>,
  next: Next
) {
  const session = context.get("session");

  if (!session) {
    return context.json(
      {
        message: "You are not authorized to access this endpoint.",
      },
      401
    );
  }

  const userId = session.get("user_id") as string;

  const result = await database
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  const userFound = result[0];

  if (!userFound) {
    return context.json(
      {
        message: "You are not authorized to access this endpoint.",
      },
      401
    );
  }

  if (requiredRoles !== undefined) {
    if (requiredRoles.includes(userFound.role)) {
      return context.json(
        {
          message: "You are not authorized to access this endpoint.",
        },
        401
      );
    }
  }

  await next();
}
