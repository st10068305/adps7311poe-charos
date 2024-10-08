import LogoutButton from "@/components/logout-button";
import Spinner from "@/components/spinners/spinner";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

const Auth = () => {
  const { isFetching, isError } = useQuery({
    initialData: {},
    queryKey: ["user-state"],
    queryFn: () =>
      new Promise(async (resolve, reject) => {
        const checkResponse = await fetch("/api/authentication/check", {
          method: "GET",
        });

        const checkStatus = checkResponse.status;

        if (checkStatus !== 200) return reject();
        else resolve({});
      }),
    retry: false,
  });

  if (isFetching)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex items-center space-x-3">
          <Spinner className="w-4 h-4" />
          <Label>Checking authentication...</Label>
        </div>
      </div>
    );

  if (isError)
    return (
      <Navigate to="/authentication/login" search={{ to: location.pathname }} />
    );

  return (
    <div className="flex flex-col w-full h-full bg-muted">
      <div className="flex items-center w-full h-auto p-3 justify-between bg-background border-b">
        <Label className="pacifico text-2xl text-primary">Charos</Label>

        <div className="flex items-center space-x-3">
          <LogoutButton />
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export const Route = createFileRoute("/_auth")({
  component: Auth,
});
