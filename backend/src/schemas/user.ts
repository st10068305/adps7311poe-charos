import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import roles from "./roles";

const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  username: varchar("username", {
    length: 255,
  }).notNull(),
  fullName: varchar("full_name", {
    length: 255,
  }).notNull(),
  idNumber: varchar("id_number", {
    length: 13,
  }).notNull(),
  accountNumber: varchar("account_number", {
    length: 10,
  }).notNull(),
  password: varchar("password", {
    length: 255,
  }).notNull(),
  active: boolean("active").default(true).notNull(),
  role: roles("role").default("customer").notNull(),
  mfaSecret: varchar("mfa_secret", {
    length: 255,
  }),
  mfaEnabled: boolean("mfa_enabled").default(false).notNull(),
  mfaVerified: boolean("mfa_verified").default(false).notNull(),
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

export const selectUsersSchema = createSelectSchema(users).omit({
  password: true,
  mfaSecret: true,
});
export const insertUsersSchema = createInsertSchema(users);

export const loginUsersSchema = insertUsersSchema.pick({
  username: true,
  accountNumber: true,
  password: true,
});

export const registerUsersSchema = insertUsersSchema.pick({
  username: true,
  fullName: true,
  idNumber: true,
  accountNumber: true,
  password: true,
});

export const updateUsersSchema = insertUsersSchema.pick({
  username: true,
  fullName: true,
  idNumber: true,
  accountNumber: true,
  role: true,
});

export default users;
