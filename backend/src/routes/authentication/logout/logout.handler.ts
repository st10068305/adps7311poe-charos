import HttpStatus from "@/lib/http-status";
import { CharosHandler } from "@/lib/types";
import { LogoutRoute } from "./logout.route";

const logoutHandler: CharosHandler<LogoutRoute> = (context) => {
  const session = context.var.session;

  session.deleteSession();

  return context.text("ok", HttpStatus.OK);
};

export default logoutHandler;
