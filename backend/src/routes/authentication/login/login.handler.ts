import database from "@/lib/database";
import HttpStatus from "@/lib/http-status";
import { CharosHandler } from "@/lib/types";
import users, { selectUsersSchema } from "@/schemas/user";
import { compare } from "bcrypt";
import { and, eq } from "drizzle-orm";
import { LoginRoute } from "./login.route";

const loginHandler: CharosHandler<LoginRoute> = async (context) => {
  const payload = context.req.valid("json");

  const existingUserResults = await database
    .select()
    .from(users)
    .where(
      and(
        eq(users.username, payload.username),
        eq(users.accountNumber, payload.accountNumber)
      )
    );
  const existingUser = existingUserResults[0] as
    | typeof users.$inferSelect
    | undefined;

  if (!existingUser)
    return context.json({ message: "User not found." }, HttpStatus.NOT_FOUND);

  const passwordMatches = await compare(
    payload.password,
    existingUser.password
  );

  if (!passwordMatches)
    return context.json(
      { message: "Invalid password." },
      HttpStatus.UNAUTHORIZED
    );

  const session = context.var.session;

  session.set("user_id", existingUser.id);
  session.set("user_username", existingUser.username);

  const loggedInUser = await database
    .update(users)
    .set({ mfaVerified: false })
    .returning();

  return context.json(
    await selectUsersSchema.parseAsync(loggedInUser[0]),
    HttpStatus.OK
  );
};

export default loginHandler;
