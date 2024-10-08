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

  return <Outlet />;
};

export const Route = createFileRoute("/_auth")({
  component: Auth,
});
