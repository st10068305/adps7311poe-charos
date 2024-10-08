import {
  boolean,
  decimal,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import providers from "./providers";

const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  fromAccountNumber: varchar("from_account_number", {
    length: 10,
  }).notNull(),
  toAccountNumber: varchar("to_account_number", {
    length: 10,
  }).notNull(),
  currency: varchar("currency", {
    length: 3,
  }).notNull(),
  provider: providers("provider").default("SWIFT").notNull(),
  providerCode: varchar("provider_code", {
    length: 255,
  }).notNull(),
  amount: decimal("amount").notNull(),
  verified: boolean("verified").default(false).notNull(),
  createdAt: timestamp("created_at", {
    mode: "string",
    precision: 6,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "string",
    precision: 6,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const selectTransactionsSchema = createSelectSchema(transactions);
export const insertTransactionsSchema = createInsertSchema(transactions).omit({
  id: true,
  fromAccountNumber: true,
  verified: true,
  createdAt: true,
  updatedAt: true,
});

export default transactions;
