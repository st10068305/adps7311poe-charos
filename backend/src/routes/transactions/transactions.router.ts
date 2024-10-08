import createRouter from "@/lib/create-router";
import createTransactionHandler from "./create/create.handler";
import createTransactionRoute from "./create/create.route";
import deleteTransactionHandler from "./delete/delete.handler";
import deleteTransactionRoute from "./delete/delete.route";
import verifyTransactionHandler from "./verify/verify.handler";
import verifyTransactionRoute from "./verify/verify.route";
import viewTransactionsHandler from "./view/view.handler";
import viewTransactionsRoute from "./view/view.route";

const transactions = createRouter()
  .openapi(viewTransactionsRoute, viewTransactionsHandler)
  .openapi(createTransactionRoute, createTransactionHandler)
  .openapi(deleteTransactionRoute, deleteTransactionHandler)
  .openapi(verifyTransactionRoute, verifyTransactionHandler);

export default transactions;
