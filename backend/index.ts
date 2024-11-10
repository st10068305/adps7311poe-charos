import { serve } from "@hono/node-server";

import app from "@/app";
import createAdmin from "@/lib/create-admin";
import { runMigrations } from "@/lib/database";
import env from "@/lib/env";
import { readFileSync } from "fs";

const port = env.PORT;

await runMigrations();

process.stdout.write("\x1Bc");

console.log(`

 ██████╗██╗  ██╗ █████╗ ██████╗  ██████╗ ███████╗
██╔════╝██║  ██║██╔══██╗██╔══██╗██╔═══██╗██╔════╝
██║     ███████║███████║██████╔╝██║   ██║███████╗
██║     ██╔══██║██╔══██║██╔══██╗██║   ██║╚════██║
╚██████╗██║  ██║██║  ██║██║  ██║╚██████╔╝███████║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝

`);

console.log("🚀 The API is running on https://localhost:" + (port + 1000));
console.log("🚀 The API is running on http://localhost:" + port);

await createAdmin();

const privateKey = readFileSync("../certs/server.key", "utf8");
const certificate = readFileSync("../certs/server.crt", "utf8");

serve({
  fetch: app.fetch,
  port,
});

serve({
  fetch: app.fetch,
  port: port + 1000,
  serverOptions: {
    key: privateKey,
    cert: certificate,
    passphrase: process.env.KEY_PASSPHRASE,
  },
});
