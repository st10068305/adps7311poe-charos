import createRouter from "@/lib/create-router";
import checkRoute from "@/routes/authentication/check/check.route";
import loginHandler from "@/routes/authentication/login/login.handler";
import loginRoute from "@/routes/authentication/login/login.route";
import checkHandler from "./check/check.handler";
import logoutHandler from "./logout/logout.handler";
import logoutRoute from "./logout/logout.route";
import registerHandler from "./register/register.handler";
import registerRoute from "./register/register.route";

const authentication = createRouter()
  .openapi(loginRoute, loginHandler)
  .openapi(logoutRoute, logoutHandler)
  .openapi(registerRoute, registerHandler)
  .openapi(checkRoute, checkHandler);

export default authentication;
