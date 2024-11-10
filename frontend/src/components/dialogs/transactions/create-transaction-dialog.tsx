import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Providers } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { HandCoinsIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const transactionSchema = z.object({
  amount: z
    .string()
    .regex(
      /^-?\d+(\.\d+)?$/g,
      "Please make sure that you provide a valid amount. E.g. 5000.0"
    ),
  currency: z
    .string()
    .min(3)
    .max(3)
    .regex(
      /^[A-Z]{3}$/g,
      "Please make sure you provide a valid currency that is 3 letters."
    ),
  provider: z
    .string()
    .regex(
      /^(Swift|PayPal|Visa)$/g,
      "Please make sure you choose a valid provider. Available providers: Swift,PayPal,Visa"
    ),
  providerCode: z
    .string()
    .regex(
      /^[A-Z]+$/g,
      "Please make sure you provide a valid provider code that has only capital letters."
    ),
  toAccountNumber: z
    .string()
    .min(10, "Please enter an account number with at least 10 digits.")
    .max(10, "Please enter an account number with at most 10 digits.")
    .regex(
      /^\d+$/g,
      "Please ensure that you have entered a valid Account Number, e.g. 2348930424"
    ),
});

export default function CreateTransactionDialog() {
  const [open, setOpen] = useState(false);

  const transactionForm = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {},
  });

  const queryClient = useQueryClient();

  const {
    data: currencies,
    isFetching: isFetchingCurrencies,
    isError: isCurrenciesError,
  } = useQuery<string[], string>({
    initialData: [],
    queryKey: ["currencies"],
    queryFn: () =>
      new Promise(async (resolve, reject) => {
        const currenciesResponse = await fetch(
          "https://open.er-api.com/v6/latest/USD",
          {
            method: "GET",
          }
        );

        const currenciesStatus = currenciesResponse.status;

        if (currenciesStatus === 200) {
          const data = await currenciesResponse.json();

          resolve(Object.keys(data.rates));
        }

        reject();
      }),
  });

  const onSubmit = async (values: z.infer<typeof transactionSchema>) => {
    const headers = new Headers();

    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Credentials", "true");

    const transactionResponse = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify({ ...values, amount: `${values.amount}` }),
      headers,
    });

    const transactionStatus = transactionResponse.status;

    if (transactionStatus === 200) {
      toast.success("Success", {
        description: "You have successfully created the transaction.",
        duration: 2000,
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      return setOpen(false);
    } else {
      try {
        const responseText = await transactionResponse.text();
        const responseJSON = JSON.parse(responseText);

        return toast.error(transactionResponse.statusText, {
          description: responseJSON.message,
          duration: 2000,
        });
      } catch (error) {
        const responseText = await transactionResponse.text();

        return toast.error("Unknown Error", {
          description: responseText,
          duration: 2000,
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button>
          <HandCoinsIcon className="w-4 h-4 mr-2" />
          Pay
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay</DialogTitle>
          <DialogDescription>
            Enter the payment details below.
          </DialogDescription>
        </DialogHeader>

        <Form {...transactionForm}>
          <form
            onSubmit={transactionForm.handleSubmit(onSubmit)}
            className="flex flex-col w-full h-auto space-y-3"
          >
            <FormField
              control={transactionForm.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.0" {...field} />
                  </FormControl>
                  <FormDescription>
                    The amount you would like to pay.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={transactionForm.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem value={currency}>{currency}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The currency you are paying in.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={transactionForm.control}
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provider</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a provider" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Providers.map((provider) => (
                        <SelectItem value={provider}>{provider}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The international payments provider you are paying with.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={transactionForm.control}
              name="toAccountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="0000000000" {...field} />
                  </FormControl>
                  <FormDescription>
                    The account number you wish to pay to.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={transactionForm.control}
              name="providerCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provider Code</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="CABLZAJJ" {...field} />
                  </FormControl>
                  <FormDescription>
                    The account you wish to pay's provider code.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button type="submit">Pay Now</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
