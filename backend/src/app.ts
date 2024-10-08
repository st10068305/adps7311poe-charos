import configureOpenAPI from "@/lib/configure-openapi";
import configureScalar from "@/lib/configure-scalar";
import createApp from "@/lib/create-app";
import {
  authentication,
  noAuthentication,
} from "@/routes/authentication/authentication.router";
import index from "@/routes/index.router";
import { OpenAPIHono } from "@hono/zod-openapi";
import { CharosConfig } from "./lib/types";
import authenticationMiddleware from "./middleware/authentication-middleware";

const app = createApp();

const authRoutes: OpenAPIHono<CharosConfig>[] = [authentication];
const noAuthRoutes: OpenAPIHono<CharosConfig>[] = [index, noAuthentication];

configureOpenAPI(app);
configureScalar(app);

noAuthRoutes.forEach((route) => app.route("/", route));

app.use(
  async (context, next) =>
    await authenticationMiddleware(undefined, context, next)
);

authRoutes.forEach((route) => app.route("/", route));

export default app;
