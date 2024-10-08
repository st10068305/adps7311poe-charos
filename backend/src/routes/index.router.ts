import { createRoute, z } from "@hono/zod-openapi";

import createRouter from "@/lib/create-router";
import TAGS from "@/lib/tags";

const CharosText = ` ██████╗██╗  ██╗ █████╗ ██████╗  ██████╗ ███████╗
██╔════╝██║  ██║██╔══██╗██╔══██╗██╔═══██╗██╔════╝
██║     ███████║███████║██████╔╝██║   ██║███████╗
██║     ██╔══██║██╔══██║██╔══██╗██║   ██║╚════██║
╚██████╗██║  ██║██║  ██║██║  ██║╚██████╔╝███████║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝

Developed by:

ST10081301:\tKyle Josh Venter
ST10068305:\tConnor Richard Davis
ST1002865:\tUmar Bux
ST10240068:\tMohamed Ziyaa Moosa
`;

const index = createRouter().openapi(
  createRoute({
    method: "get",
    path: "/api",
    tags: TAGS.INDEX,
    responses: {
      200: {
        content: {
          "text/plain": {
            schema: z.string().default("Charos API index route."),
          },
        },
        description: "Charos API index route.",
      },
    },
  }),
  (context) => {
    return context.text(CharosText, 200);
  }
);

export default index;
