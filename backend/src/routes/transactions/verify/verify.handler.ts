import database from "@/lib/database";
import HttpStatus from "@/lib/http-status";
import { CharosHandler } from "@/lib/types";
import transactions from "@/schemas/transactions";
import { eq } from "drizzle-orm";
import { VerifyTransactionRoute } from "./verify.route";

const verifyTransactionHandler: CharosHandler<VerifyTransactionRoute> = async (
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

  await database
    .update(transactions)
    .set({ verified: true })
    .where(eq(transactions.id, query.id));

  return context.text("ok", HttpStatus.OK);
};

export default verifyTransactionHandler;
