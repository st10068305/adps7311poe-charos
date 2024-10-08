import database from "@/lib/database";
import HttpStatus from "@/lib/http-status";
import { CharosHandler } from "@/lib/types";
import { selectTransactionsSchema } from "@/schemas/transactions";
import { ViewTransactionsRoute } from "./view.route";

const viewTransactionsHandler: CharosHandler<ViewTransactionsRoute> = async (
  context
) => {
  const session = context.var.session;
  const userId = session.get("user_id") as string;

  const user = await database.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });

  const transactions = await database.query.transactions.findMany({
    where: (transactions, { eq }) =>
      user?.role === "customer"
        ? eq(transactions.fromAccountNumber, user?.accountNumber)
        : undefined,
  });

  return context.json(
    [...(transactions ?? [])].map((transaction) =>
      selectTransactionsSchema.parse(transaction)
    ),
    HttpStatus.OK
  );
};

export default viewTransactionsHandler;
