import Providers from "@/components/providers";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col w-screen h-screen bg-muted">
      <Providers>
        <Outlet />
        <TanStackRouterDevtools />
      </Providers>
    </div>
  ),
});
