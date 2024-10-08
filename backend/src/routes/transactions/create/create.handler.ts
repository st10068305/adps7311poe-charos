import database from "@/lib/database";
import HttpStatus from "@/lib/http-status";
import { CharosHandler } from "@/lib/types";
import transactions, { selectTransactionsSchema } from "@/schemas/transactions";
import { CreateTransactionRoute } from "./create.route";

const createTransactionHandler: CharosHandler<CreateTransactionRoute> = async (
  context
) => {
  const payload = context.req.valid("json");

  const session = context.var.session;
  const userId = session.get("user_id") as string;
  const user = await database.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });

  if (!user)
    return context.json(
      { message: "The user was not found." },
      HttpStatus.NOT_FOUND
    );

  const createdTransaction = await database
    .insert(transactions)
    .values({ ...payload, fromAccountNumber: user.accountNumber })
    .returning();

  return context.json(
    await selectTransactionsSchema.parseAsync(createdTransaction[0]),
    HttpStatus.OK
  );
};

export default createTransactionHandler;
