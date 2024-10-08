import TransactionsTable from "@/components/tables/transactions.table";
import { Transaction } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/")({
  component: Index,
});

function Index() {
  const {
    data: transactions,
    isFetching: isFetchingTransactions,
    isError: isTransactionsError,
  } = useQuery<Transaction[], string>({
    initialData: [],
    queryKey: ["transactions"],
    queryFn: () =>
      new Promise(async (resolve, reject) => {
        const transactionsResponse = await fetch("/api/transactions", {
          method: "GET",
        });

        const transactionsStatus = transactionsResponse.status;

        if (transactionsStatus === 200) {
          const transactions = await transactionsResponse.json();

          resolve(transactions);
        }

        reject();
      }),
  });

  return (
    <div className="flex flex-col w-full h-full space-y-3 p-3">
      <TransactionsTable data={transactions} />
    </div>
  );
}
