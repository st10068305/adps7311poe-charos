import { useQueryClient } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export default function DeleteTransactionButton({
  id = null,
}: {
  id: string | null;
}) {
  if (!id) return;

  const queryClient = useQueryClient();

  const deleteTransaction = async () => {
    const deleteResponse = await fetch("/api/transactions?id=" + id, {
      method: "DELETE",
    });

    const deleteStatus = deleteResponse.status;

    if (deleteStatus === 200) {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      return toast.success("Success", {
        description: "You have deleted the transaction.",
        duration: 2000,
      });
    }

    const responseText = await deleteResponse.text();

    try {
      const responseJSON = JSON.parse(responseText);

      return toast.error(deleteResponse.statusText, {
        description: responseJSON.message,
        duration: 2000,
      });
    } catch {
      return toast.error(deleteResponse.statusText, {
        description: responseText,
        duration: 2000,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <XIcon className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            Are you absolutely sure you want to cancel this transaction? This
            action can not be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteTransaction()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
