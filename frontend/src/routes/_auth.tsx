import Providers from "@/components/providers";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const checkResponse = await fetch("/api/authentication/check", {
      method: "GET",
    });

    const checkStatus = checkResponse.status;

    console.log(checkStatus);
  },
  component: () => (
    <Providers>
      <Outlet />
    </Providers>
  ),
});
