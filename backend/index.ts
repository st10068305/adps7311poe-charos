import { serve } from "@hono/node-server";

import app from "@/app";
import createAdmin from "@/lib/create-admin";
import { runMigrations } from "@/lib/database";
import env from "@/lib/env";

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

console.log("🚀 The API is running on http://localhost:" + port);

await createAdmin();

serve({
  fetch: app.fetch,
  port,
});
