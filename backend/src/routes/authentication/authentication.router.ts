import createRouter from "@/lib/create-router";
import checkHandler from "@/routes/authentication/check/check.handler";
import checkRoute from "@/routes/authentication/check/check.route";
import loginHandler from "@/routes/authentication/login/login.handler";
import loginRoute from "@/routes/authentication/login/login.route";

export const noAuthentication = createRouter().openapi(
  loginRoute,
  loginHandler
);

export const authentication = createRouter().openapi(checkRoute, checkHandler);
