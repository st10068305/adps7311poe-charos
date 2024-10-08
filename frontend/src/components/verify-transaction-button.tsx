import { useQueryClient } from "@tanstack/react-query";
import { CheckIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function VerifyTransactionButton({
  id = null,
}: {
  id: string | null;
}) {
  if (!id) return;

  const queryClient = useQueryClient();

  const verifyTransaction = async () => {
    const verifyResponse = await fetch("/api/transactions?id=" + id, {
      method: "PUT",
    });

    const verifyStatus = verifyResponse.status;

    if (verifyStatus === 200) {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      return toast.success("Success", {
        description: "You have verified the transaction.",
        duration: 2000,
      });
    }

    const responseText = await verifyResponse.text();

    try {
      const responseJSON = JSON.parse(responseText);

      return toast.error(verifyResponse.statusText, {
        description: responseJSON.message,
        duration: 2000,
      });
    } catch {
      return toast.error(verifyResponse.statusText, {
        description: responseText,
        duration: 2000,
      });
    }
  };

  return (
    <Button onClick={() => verifyTransaction()}>
      <CheckIcon className="w-4 h-4 mr-2" />
      Verify
    </Button>
  );
}
