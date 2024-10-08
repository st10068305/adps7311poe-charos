import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { ZodError, z } from "zod";

expand(config());

const Environment = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(4000),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]),

  ADMIN_USERNAME: z.string(),
  ADMIN_PASSWORD: z
    .string()
    .min(8, "Please ensure the admin password is a minimum of 8 characters."),
  ADMIN_FULL_NAME: z.string(),
  ADMIN_ID_NUMBER: z
    .string()
    .min(13, "Please ensure the admin ID number is a minimum of 13 digits.")
    .max(13, "Please ensure the admin ID number is a maximum of 13 digits."),
  ADMIN_ACCOUNT_NUMBER: z
    .string()
    .min(10, "Please ensure the admin ID number is a minimum of 10 digits.")
    .max(10, "Please ensure the admin ID number is a maximum of 10 digits."),

  DATABASE_URL: z.string().url(),

  SESSION_SECRET: z.string(),
});

export type Environment = z.infer<typeof Environment>;

let env: Environment;

try {
  env = Environment.parse(process.env);
} catch (err) {
  const error = err as ZodError;

  console.error("🔥 Invalid Environment.");
  console.error(error.flatten().fieldErrors);

  process.exit(1);
}

export default env;
