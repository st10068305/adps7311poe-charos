import { pgEnum } from "drizzle-orm/pg-core";

const providers = pgEnum("providers", ["SWIFT"]);

export const providersEnumValues = providers.enumValues;

export default providers;
