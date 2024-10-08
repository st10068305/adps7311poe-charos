import database from "@/lib/database";
import HttpStatus from "@/lib/http-status";
import { CharosHandler } from "@/lib/types";
import users, { selectUsersSchema } from "@/schemas/user";
import { compare } from "bcrypt";
import { eq } from "drizzle-orm";
import { LoginRoute } from "./login.route";

const loginHandler: CharosHandler<LoginRoute> = async (context) => {
  const payload = context.req.valid("json");

  const existingUser = await database.query.users.findFirst({
    where: (users, { eq, and }) =>
      and(
        eq(users.username, payload.username),
        eq(users.accountNumber, payload.accountNumber)
      ),
  });

  if (!existingUser)
    return context.json(
      { message: "The user was not found." },
      HttpStatus.NOT_FOUND
    );

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
    .where(eq(users.id, existingUser.id))
    .returning();

  return context.json(
    await selectUsersSchema.parseAsync(loggedInUser[0]),
    HttpStatus.OK
  );
};

export default loginHandler;
