import database from "@/lib/database";
import HttpStatus from "@/lib/http-status";
import { CharosHandler } from "@/lib/types";
import transactions from "@/schemas/transactions";
import { eq } from "drizzle-orm";
import { DeleteTransactionRoute } from "./delete.route";

const deleteTransactionHandler: CharosHandler<DeleteTransactionRoute> = async (
  context
) => {
  const query = context.req.valid("query");

  const transaction = await database.query.transactions.findFirst({
    where: (transactions, { eq }) => eq(transactions.id, query.id),
  });

  if (!transaction)
    return context.json(
      { message: "The transaction was not found." },
      HttpStatus.NOT_FOUND
    );

  if (transaction.verified)
    return context.json(
      {
        message:
          "The transaction has already been processed, you are unable to delete it.",
      },
      HttpStatus.FORBIDDEN
    );

  await database.delete(transactions).where(eq(transactions.id, query.id));

  return context.text("ok", HttpStatus.OK);
};

export default deleteTransactionHandler;
