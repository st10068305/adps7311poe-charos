import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import "dotenv/config";
import { readFileSync } from "fs";
import path from "path";
import { defineConfig } from "vite";

const privateKey = readFileSync(
  path.join(process.cwd(), "..", "certs", "server.key")
);
const certificate = readFileSync(
  path.join(process.cwd(), "..", "certs", "server.crt")
);

export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: false,
      },
    },
    https: {
      key: privateKey,
      cert: certificate,
      passphrase: process.env.KEY_PASSPHRASE,
    },
  },
});
