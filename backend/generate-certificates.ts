import { $ } from "bun";
import { existsSync, mkdirSync } from "fs";
import path from "path";

if (!existsSync(path.join(process.cwd(), "..", "certs")))
  mkdirSync(path.join(process.cwd(), "..", "certs"));

await $`openssl genpkey -algorithm RSA -out ../certs/server.key -aes256`;

await $`openssl req -new -x509 -key ../certs/server.key -out ../certs/server.crt -days 365`;
