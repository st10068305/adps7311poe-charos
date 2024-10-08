export type Transaction = {
  id: string;
  amount: string;
  fromAccountNumber: string;
  toAccountNumber: string;
  providerCode: string;
  provider: string;
  currency: string;
  verified: boolean;
};

export const Providers: [string, ...string[]] = ["SWIFT"];
